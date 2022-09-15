export abstract class EntityRoot<PrimitiveData> {
  abstract toPrimitives (): PrimitiveData
}
