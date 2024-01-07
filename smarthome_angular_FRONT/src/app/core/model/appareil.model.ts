import { CategorieModel } from "./categorie.model"

export interface AppareilModel {
    id?: number
    label?: string
    description?: string
    state?: boolean
    categorie?: CategorieModel
  }