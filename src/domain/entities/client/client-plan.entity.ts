export class ClientPlanEntity {
  constructor(
    public id: number,
    public clientId: number,
    public planId: number
  ) {}

  public static fromObject(object: { [key: string]: any }): ClientPlanEntity {
    const { id, clientId, planId } = object;

    if (!id) throw "id is required";
    if (!clientId) throw "clientId is required";
    if (!planId) throw "planId is required";

    return new ClientPlanEntity(id, clientId, planId);
  }
}
