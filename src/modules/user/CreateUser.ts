import { User } from "../../entity/User";
import {
  Arg,
  ClassType,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { RegisterInput } from "./register/RegisterInput";
import { Product } from "../../entity/Product";

function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any
) {
  @Resolver()
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    async create(@Arg("data", () => inputType) data: typeof inputType) {
      return entity.create(data as any).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @Field()
  name: string;
}

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInput,
  User
);
export const CreateProductResolver = createResolver(
  "Product",
  Product,
  ProductInput,
  Product
);
