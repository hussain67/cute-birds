import { createContext, useContext, useState } from "react";

export const UserContext = createContext({});

const UserProvider = props => {
	const [user, setUser] = useState("Me");
	return (
		<UserContext.Provider
			value={{ user, setUser }}
			{...props}
		/>
	);
};
const useUser = () => useContext(UserContext);
export { useUser, UserProvider };
