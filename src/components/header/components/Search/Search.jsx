import { Avatar, Box, styled, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useClickOutSide from "../../../../hooks/useClickOutSide";
import useDebounce from "../../../../hooks/useDebounce";
import searchApi from "../../../../api/searchApi";

import { IconClose, IconLoading, IconSearch, IconTick } from "../../../Icons";
import { renderAvatarImage } from "../../../../constants/defaultUrlImage";
const Inputstyled = styled("input")(({ theme }) => ({
  padding: "11px 0 13px",
  background: "transparent",
  color: "rgba(22, 24, 35, 1)",
  fontSize: "1rem",
  border: 0,
  caretColor: "rgba(254, 44, 85, 1)",
  lineHeight: "22px",
  flex: 1,
  "&:focus ~ .input-border": {
    display: "block",
  },
}));
const FormStyled = styled("div")(({ theme }) => ({
  paddingLeft: "16px",
  width: "361px",
  backgroundColor: "rgba(22, 24, 35, .06)",
  borderRadius: "92px",
  lineHeight: 0,
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  position: "relative",
  zIndex: 1,
  "&::after": {
    content: '""',
    right: "52px",
    top: "9px",
    position: "absolute",
    width: "1px",
    height: "28px",
    backgroundColor: "rgba(22, 24, 35, 0.12)",
  },
  [theme.breakpoints.down(768)]: {
    display: "none",
  },
}));
const ButtonStyled = styled("button")(({ theme }) => ({
  width: "52px",
  backgroundColor: "transparent",
  height: "46px",
  padding: "10px 0 9px",
  svg: {
    marginRight: "7px",
  },
  "&:hover": {
    backgroundColor: "rgba(22, 24, 35, .03)",
  },
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  position: "relative",
}));
const BoxSearchRessult = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  marginTop: "8px",
  backgroundColor: "rgb(255, 255, 255)",
  boxShadow: "rgb(0 0 0 / 12%) 0px 2px 12px",
  paddingTop: "8px",
  borderRadius: "8px",
  maxHeight: "min((100vh - 96px) - 60px, 734px)",
  p: {
    lineHeight: "22px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  ".item": {
    padding: "9px 16px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "8px",

    ".item-name": {
      display: "flex",
      flexDirection: "column",
      p: { padding: 0 },
      "p:first-of-type": {
        position: "relative",
        svg: {
          position: "absolute",
          marginLeft: "4px",
        },
      },
      "p:last-child": {
        fontSize: "14px",
        color: "rgba(22, 24, 35, 0.5)",
        fontWeight: 400,
        lineHeight: "20px",
      },
    },
  },
}));
const Search = (props) => {
  const [searchResult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [listSearchResult, setListSearchResult] = useState([]);
  const inputRef = useRef(null);
  const handleChange = (e) => {
    if (e.target.value?.trim().length === 0) {
      setListSearchResult([]);
    }
    setSearchResult(e.target.value);
  };
  const debounced = useDebounce(searchResult, 500);
  useEffect(() => {
    if (debounced?.trim().length === 0) {
      setListSearchResult([]);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const res = await searchApi.searchUser({
          q: encodeURIComponent(debounced.length === 0 ? "" : debounced),
          type: "less",
        });
        setListSearchResult(res.data);
      } catch (error) {
        setListSearchResult([]);
      }
      setLoading(false);
    })();
  }, [debounced]);
  const { show, nodeRef: boxRef } = useClickOutSide();
  const navigate = useNavigate();
  return (
    <BoxSearch>
      <FormStyled>
        <Inputstyled
          className="input-search"
          value={searchResult}
          onChange={(e) => handleChange(e)}
          ref={inputRef}
          placeholder="Search accounts and videos"
        ></Inputstyled>

        {inputRef.current?.value.trim().length > 0 && (
          <Box
            sx={{
              cursor: "pointer",
            }}
            className={loading ? "loading-spin" : ""}
            onClick={() => {
              setSearchResult("");
              setListSearchResult([]);
              inputRef.current.value = "";
            }}
          >
            {loading ? <IconLoading /> : <IconClose />}
          </Box>
        )}

        <ButtonStyled>
          <IconSearch />
        </ButtonStyled>
        <Box
          className="input-border"
          sx={{
            position: "absolute",
            display: "none",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: "1.5px solid rgba(22, 24, 35, .2)",
            borderRadius: "92px",
            zIndex: -1,
          }}
        ></Box>
      </FormStyled>

      {show && listSearchResult.length > 0 && (
        <BoxSearchRessult ref={boxRef}>
          <Box
            sx={{
              padding: "5px 12px",
              fontSize: "14px",
              lineHeight: "20px",
              fontWeight: 600,
              height: "30px",
              color: "rgba(22, 24, 35, 0.5)",
            }}
          >
            Accounts
          </Box>
          {listSearchResult.map((item) => (
            <Box
              className="item"
              key={item.id}
              onClick={() => navigate(`/@${item.nickname}`)}
            >
              <Avatar src={renderAvatarImage(item.avatar)} />
              <Box className="item-name">
                <Typography>
                  {item.nickname}
                  {item.tick && <IconTick />}
                </Typography>
                <Typography>
                  {item.full_name.length === 0 ? item.nickname : item.full_name}
                </Typography>
              </Box>
            </Box>
          ))}

          <Box
            sx={{
              padding: "15px 16px",
            }}
          >
            <Typography className="search-view">
              {` View all results for (${debounced})`}
            </Typography>
          </Box>
        </BoxSearchRessult>
      )}
    </BoxSearch>
  );
};

export default Search;
