export interface User{
    email: string,
    name: string,
}

type AppState = {user: User | undefined}

const initialState: AppState = {user: undefined}

// export const AppStore = signalStore(
//     {providedIn: "root"},
//     // withState()
// )

