import Service from "../../services";
import { apiBase, } from "../../config";

const service = new Service();

export const getServerPlace = ( data ) => service.getResource(`${apiBase}/?q=fsrServerPlace`, data);
export const getServerGroup = ( data ) => service.getResource(`${apiBase}/?q=fsrServerGroup`, data);
export const getOperSystems = ( data ) => service.getResource(`${apiBase}/?q=fsrOperSysts`, data);
