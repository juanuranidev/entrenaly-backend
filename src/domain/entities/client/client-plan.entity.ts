export class ClientPlanEntity {
  constructor(
    public id: number,
    public planId: number,
    public clientId: number
  ) {}

  public static fromObject(object: { [key: string]: any }): ClientPlanEntity {
    const { id, clientId, planId } = object;

    if (!id) throw "id in ClientPlanEntity is required";
    if (!planId) throw "planId in ClientPlanEntity is required";
    if (!clientId) throw "clientId in ClientPlanEntity is required";

    return new ClientPlanEntity(id, planId, clientId);
  }
}
