import Service from "./services";
import { apiBase, } from "./config";

const service = new Service();

export const getResourceTypes = ( data ) => service.getResource(`${apiBase}/?q=fsrResourceTypes`, data);
