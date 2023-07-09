import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";

export const AvatarComponent = () => {
  const avatarStyle = {
    backgroundColor: "#4472C4",
    color: "#fff",
    width: 40,
    height: 40,
    fontSize: 16,
    fontWeight: "bold",
  };

  return <Avatar sx={avatarStyle} src="/static/images/avatar/2.jpg" />;
};
