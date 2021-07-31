import { httpClient } from "../utils/Config";

const url = '/product'

export const createProduct = (data)=> {
    return httpClient.post(url,data)
}

export const deleteProductById = (id) => {
    return httpClient.delete(url,id)
}