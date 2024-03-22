// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { CarBrandRepository } from "../../modules/repository/services/carBrand.repository";
// import { CarModelRepository } from "../../modules/repository/services/carModel.repository";
//
//
// @Injectable()
// export class SellingLimits implements CanActivate {
//   constructor(
//     private carBrandRepository: CarBrandRepository,
//     private carModelRepository: CarModelRepository,
//   ) {}
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
