import * as VuexClass from 'vuex-class'

export const namespace = (namespace: string) => {
  const Action = VuexClass.namespace(namespace, VuexClass.Action)
  const State = VuexClass.namespace(namespace, VuexClass.State)
  const Getter = VuexClass.namespace(namespace, VuexClass.Getter)
  const Mutation = VuexClass.namespace(namespace, VuexClass.Mutation)
  return { Action, State, Getter, Mutation }
}
