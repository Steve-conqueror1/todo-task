import React from "react";

export function createContextAndProvider<T>(): readonly [() => T, React.Provider<T | undefined>] {
    const context = React.createContext<T | undefined>(undefined);

    function useContextHook(): T {
        const c = React.useContext(context);
        if (!c) {
            throw new Error("context must be inside a provide with a value");
        }
        return c;
    }

    return [useContextHook, context.Provider] as const;
}
