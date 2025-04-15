import Service from "../../services";
import { apiBase, } from "../../config";

const service = new Service();

export const getServerPlace = ( data ) => service.getResource(`${apiBase}/?q=fsrServerPlace`, data);
