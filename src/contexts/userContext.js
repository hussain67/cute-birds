import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, getUserInfo } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
	user: "",
	displayName: "",
	setUser: () => null
});

const UserProvider = props => {
	const [user, setUser] = useState(null);
	const [displayName, setDisplayName] = useState("");

	useEffect(() => {
		const unsubcribe = onAuthStateChangedListener(async user => {
			if (user) {
				setUser(user);
				const userData = await getUserInfo(user);
				if (userData) {
					setDisplayName(userData.displayName);
				}
			} else {
				setDisplayName("");
				setUser(null);
			}
		});
		return unsubcribe;
	}, []);

	return (
		<UserContext.Provider
			value={{ user, setUser, displayName, setDisplayName }}
			{...props}
		/>
	);
};
const useUser = () => useContext(UserContext);
export { useUser, UserProvider };
