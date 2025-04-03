import Service from "../../services";
import { apiBase, } from "../../config";

const service = new Service();

export const getFilePlace = ( data ) => service.getResource(`${apiBase}/?q=fsrFilePlace`, data);
