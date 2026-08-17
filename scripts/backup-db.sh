#!/bin/bash
# Backup automático PostgreSQL LASEC
DATA=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/lasec"
BACKUP_FILE="${BACKUP_DIR}/lasec_orcamentos_${DATA}.sql"
PGPASSWORD="Xando1973#" pg_dump -h 127.0.0.1 -U lasec_user -d lasec_orcamentos > "${BACKUP_FILE}"
gzip "${BACKUP_FILE}"
echo "$(date): Backup criado: ${BACKUP_FILE}.gz" >> /var/log/lasec-backup.log
# Manter apenas últimos 30 dias
find ${BACKUP_DIR} -name "*.sql.gz" -mtime +30 -delete
