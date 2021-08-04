// 在联合`UpdateAction | RemoveAction`中搜索公共`type`字段来获取相应的payload类型。
enum ActionEnum {
    update,
    remove
}

interface UpdateAction {
    type: ActionEnum.update,
    payload: {
        updateData: string
    }
}

interface RemoveAction {
    type: ActionEnum.remove,
    payload: {
        removeData: number
    }
}

// result
type res = YourTypeFunc<UpdateAction | RemoveAction, ActionEnum.update>

type YourTypeFunc<T, P> = T extends {type: infer M, payload: infer N}
    ? M extends P
        ? N
        : never
    : never;