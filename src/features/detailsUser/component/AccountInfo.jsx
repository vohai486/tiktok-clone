import { Box, Button, Skeleton, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IconEdit, IconTick } from "../../../components/Icons";
import { renderAvatarImage } from "../../../constants/defaultUrlImage";
import { useShowModal } from "../../../context/showModalContext";
import ButtonFollowing from "../../button/ButtonFollowing";
const BoxInfo = styled(Box)({
  maxWidth: "624px",
  marginBottom: "20px",
});
const BoxName = styled(Box)({
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
});
const BoxFollow = styled(Box)({
  marginBottom: "10px",
  display: "flex",
  gap: "20px",
  h4: {
    display: "inline-block",
    marginRight: "6px",
    fontSize: "18px",
    fontWeight: 600,
  },
  span: {
    color: "rgba(22, 24, 35, 0.75)",
  },
});
const AccountInfo = ({ loading, setOpen }) => {
  const { showModal, setShowModal } = useShowModal();
  const user = useSelector((state) => state.user.userInfo);
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  return (
    <BoxInfo>
      <BoxName>
        <Box
          sx={{
            width: "116px",
            height: "116px",
            borderRadius: "50%",
            img: {
              borderRadius: "50%",
              height: "100%",
              objectFit: "cover",
              width: "100%",
            },
          }}
        >
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={116}
              height={116}
            />
          ) : (
            <img src={renderAvatarImage(user?.avatar)} alt="" />
          )}
        </Box>

        <Box>
          {loading ? (
            <Typography
              component={"h2"}
              sx={{
                fontSize: "32px",
              }}
            >
              {" "}
              <Skeleton animation="wave" sx={{ width: "200px" }} />
            </Typography>
          ) : (
            <Typography
              component={"h2"}
              sx={{
                // lineHeight: "38px",
                fontSize: "32px",
                fontWeight: "bold",
                svg: {
                  width: "20px",
                  height: "20px",
                },
              }}
            >
              {user?.nickname} {user?.tick && <IconTick />}
            </Typography>
          )}

          <Typography
            component={"h3"}
            sx={{
              fontSize: "18px",
              lineHeight: "25px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              marginBottom: "13px",
            }}
          >
            {loading ? (
              <Skeleton animation="wave" />
            ) : user?.first_name?.length === 0 &&
              user?.first_name?.length === 0 ? (
              user?.nickname
            ) : (
              user?.first_name + " " + user?.last_name
            )}
          </Typography>
          {user.id === loggedInUser.id ? (
            <Button
              variant="outlined"
              sx={{
                borderRadius: "4px",
                color: "#161823",
                borderColor: "rgba(22, 24, 35, .12)",
                height: "36px",
                fontWeight: 600,
                textTransform: "capitalize",
                "&:hover": {
                  background: "rgba(248, 248, 248, 1)",
                  borderColor: "rgb(208, 209, 211)",
                },
                svg: {
                  width: "20px",
                  height: "20px",
                },
              }}
              onClick={() => setOpen(true)}
            >
              <IconEdit /> Edit profile
            </Button>
          ) : (
            <ButtonFollowing
              id={user.id}
              isFollow={!!user.is_followed}
              type="red"
              width="208px"
            />
          )}
        </Box>
      </BoxName>
      <BoxFollow>
        <Box>
          <Typography component="h4">{user?.followings_count}</Typography>
          <span>Following</span>
        </Box>
        <Box>
          <Typography component="h4">{user?.followers_count}</Typography>
          <span>Followers</span>
        </Box>
        <Box>
          <Typography component="h4">{user?.likes_count}</Typography>
          <span>Likes</span>
        </Box>
      </BoxFollow>
      <Box>
        <Typography>
          {user?.bio?.length === 0 ? "No bio yet." : user?.bio}
        </Typography>
      </Box>
    </BoxInfo>
  );
};

export default AccountInfo;
