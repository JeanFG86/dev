import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { CategoryModelMapper } from "../category-model-mapper";
import { Category } from "../../../../domain/category.entity";
import { Uuid } from "../../../../../shared/domain/value-objects/uuid.vo";
import { EntityValidationError } from "../../../../../shared/domain/validators/validation.errors";
import { setupSequelize } from "../../../../../shared/infra/testing/helpers";

describe("CategoryModelMapper Integration Tests", () => {
  setupSequelize({ models: [CategoryModel] });

  it("should throws error when category is invalid", () => {
    const model = CategoryModel.build({
      category_id: "2366b7dc-2671-4799-b91c-c64adb2251e4",
    });
    try {
      CategoryModelMapper.toEntity(model);
      fail("The category is valid, but it needs throws a EntityValidationError");
    } catch (e) {
      expect(e).toBeInstanceOf(EntityValidationError);
      expect((e as EntityValidationError).error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    }
  });

  it("should convert a category model to a category aggregate", () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      category_id: "2366b7dc-2671-4799-b91c-c64adb2251e4",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });
    const aggregate = CategoryModelMapper.toEntity(model);
    expect(aggregate.toJSON()).toStrictEqual(
      new Category({
        category_id: new Uuid("2366b7dc-2671-4799-b91c-c64adb2251e4"),
        name: "some value",
        description: "some description",
        is_active: true,
        created_at,
      }).toJSON()
    );
  });

  test("should convert a category aggregate to a category model", () => {
    const created_at = new Date();
    const aggregate = new Category({
      category_id: new Uuid("2366b7dc-2671-4799-b91c-c64adb2251e4"),
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });
    const model = CategoryModelMapper.toModel(aggregate);
    expect(model.toJSON()).toStrictEqual({
      category_id: "2366b7dc-2671-4799-b91c-c64adb2251e4",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });
  });
});
