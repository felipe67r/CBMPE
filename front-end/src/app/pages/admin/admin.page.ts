import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  locationOutline, timeOutline, menuOutline, chevronBackOutline,
  closeOutline, downloadOutline, documentTextOutline, listOutline
} from 'ionicons/icons';
import * as L from 'leaflet';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule]
})
export class AdminPage implements OnInit, AfterViewInit, OnDestroy {

  ocorrencias: any[] = [];
  sidebarAtiva: boolean = true;
  private map!: L.Map;
  private apiUrl = 'http://localhost:3000/ocorrencias';

  // Logs
  mostrarLogs = false;
  logs: { timestamp: string; tipo: 'info' | 'aviso' | 'erro'; mensagem: string }[] = [];

  // Modal PDF
  mostrarModalPDF = false;
  ocorrenciaPDF: any = null;

  constructor(private http: HttpClient) {
    addIcons({
      locationOutline, timeOutline, menuOutline, chevronBackOutline,
      closeOutline, downloadOutline, documentTextOutline, listOutline
    });
  }

  ngOnInit() {
    this.adicionarLog('info', 'Painel administrativo carregado.');
    this.buscarOcorrenciasReais();
  }

  ngAfterViewInit() {
    this.inicializarMapa();
  }

  // ─── MAPA ────────────────────────────────────────────────────────────────

  inicializarMapa() {
    setTimeout(() => {
      this.map = L.map('map', {
        center: [-8.05428, -34.8813],
        zoom: 12,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(this.map);

      this.map.invalidateSize();

      L.circle([-8.0500, -34.8870], {
        color: '#ed3237', fillColor: '#ed3237', fillOpacity: 0.5, radius: 400
      }).addTo(this.map).bindPopup('<b>Foco: Incêndio Residencial</b><br>Rua da Aurora');

      L.circle([-8.1150, -34.8950], {
        color: '#ed3237', fillColor: '#ed3237', fillOpacity: 0.5, radius: 500
      }).addTo(this.map).bindPopup('<b>Foco: Acidente de Trânsito</b><br>Av. Boa Viagem');
    }, 100);
  }

  toggleSidebar() {
    this.sidebarAtiva = !this.sidebarAtiva;
    setTimeout(() => { if (this.map) this.map.invalidateSize(); }, 320);
  }

  // ─── OCORRÊNCIAS ─────────────────────────────────────────────────────────

  buscarOcorrenciasReais() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (dados) => {
        this.ocorrencias = dados;
        this.adicionarLog('info', `${dados.length} ocorrência(s) carregada(s) do servidor.`);
      },
      error: (erro) => {
        this.adicionarLog('aviso', 'Servidor indisponível. Usando dados locais de demonstração.');
        this.ocorrencias = [
          { protocolo: '801', natureza: 'Incêndio Residencial', status: 'Concluído', prioridade: 'Alta', endereco: 'Rua da Aurora, 123 - Boa Vista', horario: '19:14' },
          { protocolo: '802', natureza: 'Acidente de Trânsito', status: 'Concluído', prioridade: 'Média', endereco: 'Av. Boa Viagem, 987 - Pina', horario: '03:00' },
          { protocolo: '803', natureza: 'Salvamento em Altura', status: 'Atendido', prioridade: 'Alta', endereco: 'Ed. Empresarial, Centro', horario: '11:30' },
          { protocolo: '804', natureza: 'Vazamento de Gás', status: 'Despachado', prioridade: 'Baixa', endereco: 'Rua Real da Torre, 45 - Madalena', horario: '08:05' }
        ];
      }
    });
  }

  // ─── PDF ─────────────────────────────────────────────────────────────────

  gerarPDF(protocolo: string) {
    const occ = this.ocorrencias.find(o => o.protocolo === protocolo);
    if (!occ) return;
    this.ocorrenciaPDF = occ;
    this.mostrarModalPDF = true;
    this.adicionarLog('info', `Relatório PDF aberto para protocolo ${protocolo}.`);
  }

  fecharModalPDF() {
    this.mostrarModalPDF = false;
    this.ocorrenciaPDF = null;
  }

  baixarPDF() {
    if (!this.ocorrenciaPDF) return;
    const occ = this.ocorrenciaPDF;
    const agora = new Date().toLocaleString('pt-BR');

    const conteudoHTML = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Relatório - Protocolo ${occ.protocolo}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; font-size: 13px; color: #000; padding: 40px; }
          .header { display: flex; align-items: center; gap: 16px; border-bottom: 3px solid #ed3237; padding-bottom: 16px; margin-bottom: 24px; }
          .header h1 { font-size: 20px; color: #000; }
          .header p { font-size: 11px; color: #555; margin-top: 4px; }
          .badge { display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 11px; font-weight: bold; }
          .badge-alta { background: rgba(237,50,55,.15); color: #ed3237; }
          .badge-media { background: rgba(245,124,0,.15); color: #f57c00; }
          .badge-baixa { background: rgba(56,142,60,.15); color: #388e3c; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          th { background: #000; color: #fff; padding: 8px 12px; text-align: left; font-size: 12px; }
          td { padding: 8px 12px; border-bottom: 1px solid #e0e0e0; font-size: 12px; }
          tr:nth-child(even) td { background: #f9f9f9; }
          .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: .5px; margin: 24px 0 8px; border-left: 4px solid #ed3237; padding-left: 8px; }
          .footer { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 12px; font-size: 11px; color: #888; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>Relatório de Ocorrência</h1>
            <p>Corpo de Bombeiros Militar de Pernambuco — Gerado em ${agora}</p>
          </div>
        </div>

        <div class="section-title">Identificação</div>
        <table>
          <tr><th>Campo</th><th>Valor</th></tr>
          <tr><td>Protocolo</td><td><strong>${occ.protocolo}</strong></td></tr>
          <tr><td>Natureza</td><td>${occ.natureza}</td></tr>
          <tr><td>Status</td><td>${occ.status ?? '—'}</td></tr>
          <tr><td>Prioridade</td><td><span class="badge badge-${(occ.prioridade ?? '').toLowerCase()}">${occ.prioridade ?? '—'}</span></td></tr>
          <tr><td>Endereço</td><td>${occ.endereco ?? occ.local ?? '—'}</td></tr>
          <tr><td>Horário</td><td>${occ.horario ?? occ.horaPedido ?? '—'}</td></tr>
        </table>

        <div class="footer">
          Documento gerado automaticamente pelo sistema CBMPE · Protocolo ${occ.protocolo}
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([conteudoHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const janela = window.open(url, '_blank');
    if (janela) {
      janela.onload = () => { janela.print(); };
    }

    this.adicionarLog('info', `PDF do protocolo ${occ.protocolo} enviado para impressão/download.`);
    this.fecharModalPDF();
  }

  // ─── EXPORTAÇÃO ──────────────────────────────────────────────────────────

  exportarCSV() {
    const cabecalho = ['Protocolo', 'Natureza', 'Status', 'Prioridade', 'Endereço', 'Horário'];
    const linhas = this.ocorrencias.map(o => [
      o.protocolo ?? '',
      o.natureza ?? '',
      o.status ?? o.estado ?? '',
      o.prioridade ?? o.gravidade ?? '',
      o.endereco ?? o.local ?? '',
      o.horario ?? o.horaPedido ?? ''
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));

    const csv = [cabecalho.join(','), ...linhas].join('\r\n');
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    this.downloadArquivo(blob, `ocorrencias_cbmpe_${this.dataHoje()}.csv`);
    this.adicionarLog('info', `Base de dados exportada em CSV (${this.ocorrencias.length} registros).`);
  }

  exportarExcel() {
    const cabecalho = ['Protocolo', 'Natureza', 'Status', 'Prioridade', 'Endereço', 'Horário'];
    const linhas = this.ocorrencias.map(o => [
      o.protocolo ?? '',
      o.natureza ?? '',
      o.status ?? o.estado ?? '',
      o.prioridade ?? o.gravidade ?? '',
      o.endereco ?? o.local ?? '',
      o.horario ?? o.horaPedido ?? ''
    ]);

    // Gera XML Excel (formato .xls compatível, abre no Excel/LibreOffice sem dependências)
    const estiloHeader = 'background:#000000;color:#ffffff;font-weight:bold;padding:6px 10px;';
    const estiloCelula = 'padding:6px 10px;border:1px solid #e0e0e0;';

    const linhasHTML = linhas.map((row, i) =>
      `<tr style="background:${i % 2 === 0 ? '#ffffff' : '#f9f9f9'}">` +
      row.map(v => `<td style="${estiloCelula}">${v}</td>`).join('') +
      '</tr>'
    ).join('');

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8">
      <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>
      <x:ExcelWorksheet><x:Name>Ocorrências</x:Name>
      <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
      </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      </head><body>
      <table>
        <thead><tr>${cabecalho.map(c => `<th style="${estiloHeader}">${c}</th>`).join('')}</tr></thead>
        <tbody>${linhasHTML}</tbody>
      </table></body></html>`;

    const bom = '\uFEFF';
    const blob = new Blob([bom + html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    this.downloadArquivo(blob, `ocorrencias_cbmpe_${this.dataHoje()}.xls`);
    this.adicionarLog('info', `Base de dados exportada em Excel (${this.ocorrencias.length} registros).`);
  }

  private downloadArquivo(blob: Blob, nomeArquivo: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;
    a.click();
    URL.revokeObjectURL(url);
  }

  private dataHoje(): string {
    return new Date().toISOString().split('T')[0];
  }

  // ─── LOGS ────────────────────────────────────────────────────────────────

  abrirLogs() {
    this.mostrarLogs = true;
  }

  fecharLogs() {
    this.mostrarLogs = false;
  }

  adicionarLog(tipo: 'info' | 'aviso' | 'erro', mensagem: string) {
    this.logs.unshift({
      timestamp: new Date().toLocaleString('pt-BR'),
      tipo,
      mensagem
    });
    // Mantém no máximo 100 entradas
    if (this.logs.length > 100) this.logs.pop();
  }

  limparLogs() {
    this.logs = [];
    this.adicionarLog('info', 'Histórico de logs limpo pelo administrador.');
  }

  openChart(tipo: string) {
    this.adicionarLog('info', `Gráfico de "${tipo}" solicitado.`);
    console.log('Gráfico:', tipo);
  }

  ngOnDestroy() {
    if (this.map) this.map.remove();
  }
}
