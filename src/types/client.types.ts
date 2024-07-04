/* eslint-disable prettier/prettier */

interface ClientType {
  nameClient: string;
  nameFiles: string[];
}

const ClientTypes = {
  STEWARD: {
    nameClient: 'STEWARD',
    nameFiles: ['ACUMULADO', 'S_S', 'DETALLE_RETENCION_FUENTE']
  } as ClientType
};

export default ClientTypes;
