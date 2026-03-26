---
name: Regras Construcao Pos-Processadores SolidCAM
description: Regras criticas para construir pos-processadores SolidCAM (.GPP .MAC .vmid) - specs reais maquina, estrutura vmid, erros passados, nunca chutar valores
type: feedback
---

# Regras para Construcao de Pos-Processadores SolidCAM
# Criado: 19/03/2026 — baseado em erros e correcoes durante construcao do pos Doosan Lynx 220LM

## REGRA 1: NUNCA CHUTAR SPECS — SEMPRE VERIFICAR
- RPM spindle, RPM live tooling, potencias, cursos — BUSCAR no site do fabricante
- Se nao encontrar online, PERGUNTAR ao Alexandre
- Consultar `maquinas_specs.md` ANTES de definir qualquer valor no vmid
- **Why:** Alexandre corrigiu valores errados que foram chutados. Specs erradas causam erros no SolidCAM (RPM nao aceita, ferramentas incompativeis)
- **How to apply:** Antes de escrever qualquer vmid, ler maquinas_specs.md e confirmar TODOS os valores numericos

## REGRA 2: FORMATO VMID — SolidCAM 2020 (CRITICO)
**USAR SEMPRE o dmu80.mt.vmid como base!** Clonar estrutura e so trocar specs da maquina.
- Path: `E:\Users\Public\Documents\SolidCAM\SolidCAM2020\Gpptool\dmu80.mt.vmid`
- Formato: `<Device>`/`<Components>`, Machine Ver="29", Device Ver="17", Axis Ver="11"
- **NAO usar formato antigo** (`<SubDevice>`/`<SubDevices>`, Ver="24") — causa todos os erros

### Estrutura obrigatoria (formato SolidCAM 2020):
1. **Turret** (Device Type="2") — ferramentas
   - Station_1: Type="8", MaxPositions="J", HolderType="NONE"
   - Station Options: ALL ZEROS
   - Turret Gears: MaxSpin=[RPM live tooling], Power=[kW live tooling]
   - Turret Options: ID7=2, ID11=10, ID18=2, ID19=8, ID29=9 (habilita 4-eixo)

2. **Table** (Device Type="1") — spindle/chuck
   - Station_1: Type="10"
   - Station Options: ALL ZEROS
   - Table Gears: MaxSpin=[RPM spindle], Power=[kW spindle]
   - Table Options: ID11=10, ID31=15, ID40=3

3. **Machine root Options:** ID0=9

### Controller (COPIAR do DMU80):
- PosToMachNoParams: Dir4x="1", WithDeviationAngles="1", Positive4xDirOnly="1"
- WorkingStyle: PosToMach="1", HomeDataAtStart="1"
- ProceduresDef: GenProc="1", DrillProc="1"
- Support4xHelicalArcs="1"
- MillDrilCycles + TurnDrilCycles definidos
- TraceOutput, ChannelsSyncDef presentes

### Combination:
- OperationType="4" (Mill & Turn)
- C axis: UsedInTurningAs="0" (C so para fresamento, NAO torneamento)
- MaxInverseFeed="99999.999"

## REGRA 3: ERROS QUE JA COMETEMOS (NAO REPETIR)
| Erro | Consequencia | Correcao |
|------|-------------|----------|
| Name="Spindle" no turret | UI mostra "Spindle" como destino, confuso | Usar Name="Turret" |
| SpindlePowerMax="15" no turret | SolidCAM acha que turret e spindle de fresa | Colocar 0 |
| Apenas 1 Station definida | Pode impedir atribuicao correta de ferramentas | Definir TODAS as estacoes |
| HolderType="BMT45" nas estacoes | Restringe tipos de ferramenta aceitos | Usar "NONE" |
| MaxSpin="0" no Machine root | SolidCAM nao aceita entrada de RPM | Colocar RPM real do spindle |
| MaxSpin="0" nas estacoes | Pode impedir operacoes com ferramenta acionada | Colocar RPM real do live tooling |

## REGRA 4: SPECS DOOSAN LYNX 220LM (REFERENCIA RAPIDA)
- **Spindle principal:** 6.000 RPM, 15 kW
- **Live tooling:** 6.000 RPM, 3,7 kW
- **Turret:** BMT45P, 24 estacoes (confirmado Alexandre)
- **Eixos:** X (175mm raio), Z (550mm), C (continuo)
- **Rapids:** X 30m/min, Z 36m/min
- **CNC:** Fanuc 0i-TF

## REGRA 5: REPOSITORIO E BACKUP
- **GitHub:** `asouza3044-hash/pos-processadores-lasec` (privado)
- **Local:** `C:\Users\lasec\Documents\pos-processadores-lasec`
- **VM Oracle:** `/home/ubuntu/backup_lasec/pos-processadores-lasec/`
- **E: drive (teste):** `E:\pos processador\PÓS FANUC\[MAQUINA]\`
- **D: drive (fonte):** `D:\Material SolidCAM\pos processador\`
- Apos cada correcao: salvar em E:, D:, commit+push GitHub, SCP para VM
- Documentacao de aprendizados: `docs/regras-vmid.md` no repo

## REGRA 6: ARQUIVOS DO POS-PROCESSADOR
- **.vmid** — definicao da maquina (XML): eixos, turret, estacoes, controller, ciclos
- **.GPP** — logica do pos (GPPL): handlers, formatacao, G-codes
- **.MAC** — configuracao maquina: tipo, eixos, capacidades
- Os 3 arquivos DEVEM ser consistentes entre si
- Testar SEMPRE com SolidCAM fechado e reaberto (cacheia vmid)

## REGRA 7: VALIDACAO ANTES DE ENTREGAR
1. Conferir TODOS os valores numericos contra maquinas_specs.md
2. Conferir numero de estacoes = real da maquina
3. Conferir RPM spindle E live tooling separadamente
4. Conferir potencias (spindle != live tooling)
5. Testar: torneamento, furacao axial, furacao radial (acionada), fresamento C-axis
