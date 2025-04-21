import Service from "../../services";
import { apiBase, } from "../../config";

const service = new Service();

export const getFilePlace = ( data ) => service.getResource(`${apiBase}/?q=fsrFilePlace`, data);
export const getFileResources = ( data ) => service.getResource(`${apiBase}/?q=fsrFileResouces`, data);
export const fileSubmit = ( data ) => service.postResource(`${apiBase}/?q=fileSubmit`, data);
