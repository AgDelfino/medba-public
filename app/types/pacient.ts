export type PacientDetail = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'En Proceso'
    | 'Completada'
    | 'Rechazada'
    | null
    | undefined;
  medic: string;
};

export type PacientInfo = {
  imageUrl: string;
  name: string;
  birthday: string;
  genre: string;
  dni: string;
  bloodType: string;
};

export type PacientItemDetail = {
  id: string;
  title: string;
  date: string;
  details: string;
  items: {
    id: string;
    medic: string;
    date: string;
    text: string;
    files: {
      name: string;
    }[];
  }[];
};
