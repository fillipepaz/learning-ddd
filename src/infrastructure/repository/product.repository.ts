import Product from "../../domain/entity/product";
import ProductModel from "../database/sequelize/model/product.model";
import ProductRepositoryInterface from "./product-repository.interface";

export default class ProductRepository implements ProductRepositoryInterface{

    async create(entity: Product):Promise<void>{
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })
    }
   async  update(entity: Product):Promise<void>{

    await ProductModel.update({
       
        name: entity.name,
        price: entity.price
    },{
    where: {
        id: entity.id,
    }})

    }
    async find(id: string):Promise<Product>{
        const productModel = await ProductModel.findOne({where: {id: id}})
        return new Product(productModel.id, productModel.price, productModel.name)
        

    }
    async findAll():Promise<Product[]>{

        const productModels = await ProductModel.findAll();
        return productModels.map((productModel) => new Product(productModel.id, productModel.price, productModel.name))}

}