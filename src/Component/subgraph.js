import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { monthNames } from "../helper/monthNameDatas";
import Media from "../Theme/media-breackpoint";
// import WImg from '../Assets/images/b-icon.png';
import degenIcon from "../Assets/images/Degen_token.png";
import bnbIcon from "../Assets/images/bnb-icon.png";
import Icon1 from "../Assets/images/icon-1.png";
import Icon2 from "../Assets/images/icon-2.png";

function Subgraph(props) {
  // State Variables
  const [subGraphDatas, setSubGraphDatas] = useState([]); // Subgraph Datas
  const [subGraphDatasByParams, setSubGraphDatasByParams] = useState([]); // Subgraph Datas By Parameters
  const [graphType, setGraphType] = useState("day"); // Graph Data Display Type
  const [graphData, setGraphData] = useState([]); // Graph Datas
  const [selectedValue, setSelectedValue] = useState(""); // Current Value
  const [liquidityClass, setLiquidityClass] = useState(""); // Add Liquidity Class
  const [enableLiquidityClass, setEnableLiquidityClass] = useState(""); // Enable Liquidity Class
  const [removeLiquidityClass, setRemoveLiquidityClass] = useState(""); // Remove Liquidity Class
  const [firstToken, setFirstToken] = useState(""); // First Token
  const [secondToken, setSecondToken] = useState(""); // Second Token
  const [graphPeriod, setGraphPeriod] = useState("Past 24 Hours"); // Graph Period
  const [changeAmount, setChangeAmount] = useState(""); // Changed amount in Graph
  const [changePercent, setChangePercent] = useState(""); // Changed percent in Graph
  const [changePairOrder, setChangePairOrder] = useState(false); // Vote Class
  const [pairId, setPairId] = useState(
    "0x3113bf53d7ec3ebefe0d75eec7ad64dc3976cd36"
  ); // Pair address
  const [transactionSettingClass, setTransactionSettingClass] = useState(""); // Transaction Setting Class

  // Functions
  useEffect(() => {
    if (
      subGraphDatas &&
      subGraphDatas.pairHourDatas &&
      subGraphDatas.pairHourDatas.length > 0
    ) {
      var e = { target: { value: "day" } };
      graphTypeChange(e, changePairOrder);
    }
    setChangePairOrder(props.changeCoinPair);
  }, [subGraphDatas]);
  useEffect(() => {
    if(subGraphDatasByParams && subGraphDatasByParams.pairHourDatas){
      changePair();
    }
  }, [props.changeCoinPair]);
  const graphTypeChange = (e, cpa) => {
    setGraphType(e.target.value);
    console.log(subGraphDatas, "subgraph DATass", subGraphDatasByParams)
    if (e.target.value === "day") {
      var daily = [];
      var length = subGraphDatasByParams.pairHourDatas.length;
      var endValue = 0;
      var smallValue = 0;
      var changed = 0;
      var percent = 0;
      if (cpa) {
        endValue =
          subGraphDatasByParams.pairHourDatas[0].reserve1 /
          subGraphDatasByParams.pairHourDatas[0].reserve0;
        smallValue =
          subGraphDatasByParams.pairHourDatas[length - 1].reserve1 /
          subGraphDatasByParams.pairHourDatas[length - 1].reserve0;
        changed = endValue - smallValue;
        percent = (Math.abs(changed) / smallValue) * 100;
      } else {
        endValue =
          subGraphDatasByParams.pairHourDatas[0].reserve0 /
          subGraphDatasByParams.pairHourDatas[0].reserve1;
        smallValue =
          subGraphDatasByParams.pairHourDatas[length - 1].reserve0 /
          subGraphDatasByParams.pairHourDatas[length - 1].reserve1;
        changed = endValue - smallValue;
        percent = (Math.abs(changed) / smallValue) * 100;
      }
      if (changed >= 0) {
        setChangeAmount("+" + Math.abs(changed).toFixed(5));
        setChangePercent("+" + percent.toFixed(2));
      } else {
        setChangeAmount("-" + Math.abs(changed).toFixed(5));
        setChangePercent("-" + percent.toFixed(2));
      }
      setFirstToken(subGraphDatasByParams.pairHourDatas[0].pair.token1.symbol);
      setSecondToken(subGraphDatasByParams.pairHourDatas[0].pair.token0.symbol);
      for (var i = 0; i < subGraphDatasByParams.pairHourDatas.length; i++) {
        var value =
          subGraphDatasByParams.pairHourDatas[i].reserve0 /
          subGraphDatasByParams.pairHourDatas[i].reserve1;
        if (value < smallValue) {
          smallValue = value;
        }
      }
      for (var j = 0; j < subGraphDatasByParams.pairHourDatas.length; j++) {
        var dailyObject = {};
        var date = new Date(
          subGraphDatasByParams.pairHourDatas[j].hourStartUnix * 1000
        );
        var minutes = date.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        dailyObject.name = date.getHours() + ":" + minutes;
        if (cpa) {
          dailyObject.real = (
            subGraphDatasByParams.pairHourDatas[j].reserve1 /
            subGraphDatasByParams.pairHourDatas[j].reserve0
          ).toFixed(4);
        }else{
          dailyObject.real = (
            subGraphDatasByParams.pairHourDatas[j].reserve0 /
            subGraphDatasByParams.pairHourDatas[j].reserve1
          ).toFixed(4);
        }
        dailyObject.value = dailyObject.real - smallValue + 1;
        daily[subGraphDatasByParams.pairHourDatas.length - j - 1] = dailyObject;
      }
      setSelectedValue(daily[daily.length - 1].real);
      setGraphData(daily);
      setGraphPeriod("Past 24 Hours");
    } else if (e.target.value === "week") {
      var weekly = [];
      length = subGraphDatas.pairHourDatas.length;
      if (cpa) {
        endValue =
          subGraphDatas.pairHourDatas[0].reserve1 /
          subGraphDatas.pairHourDatas[0].reserve0;
        smallValue =
          subGraphDatas.pairHourDatas[length - 1].reserve1 /
          subGraphDatas.pairHourDatas[length - 1].reserve0;
        changed = endValue - smallValue;
        percent = (Math.abs(changed) / smallValue) * 100;
      } else {
        endValue =
          subGraphDatas.pairHourDatas[0].reserve0 /
          subGraphDatas.pairHourDatas[0].reserve1;
        smallValue =
          subGraphDatas.pairHourDatas[length - 1].reserve0 /
          subGraphDatas.pairHourDatas[length - 1].reserve1;
        changed = endValue - smallValue;
        percent = (Math.abs(changed) / smallValue) * 100;
      }
      if (changed >= 0) {
        setChangeAmount("+" + Math.abs(changed).toFixed(5));
        setChangePercent("+" + percent.toFixed(2));
      } else {
        setChangeAmount("-" + Math.abs(changed).toFixed(5));
        setChangePercent("-" + percent.toFixed(2));
      }
      setFirstToken(subGraphDatas.pairHourDatas[0].pair.token1.symbol);
      setSecondToken(subGraphDatas.pairHourDatas[0].pair.token0.symbol);
      for (var k = 0; k < subGraphDatas.pairHourDatas.length; k++) {
        value =
          subGraphDatas.pairHourDatas[k].reserve0 /
          subGraphDatas.pairHourDatas[k].reserve1;
        if (value < smallValue) {
          smallValue = value;
        }
      }
      for (var l = 0; l < subGraphDatas.pairHourDatas.length; l++) {
        var weeklyObject = {};
        date = new Date(subGraphDatas.pairHourDatas[l].hourStartUnix * 1000);
        weeklyObject.name =
          monthNames[date.getMonth()].name + " " + date.getDate();
        if (cpa) {
          weeklyObject.real = (
            subGraphDatas.pairHourDatas[l].reserve1 /
            subGraphDatas.pairHourDatas[l].reserve0
          ).toFixed(4);
        }else{
          weeklyObject.real = (
            subGraphDatas.pairHourDatas[l].reserve0 /
            subGraphDatas.pairHourDatas[l].reserve1
          ).toFixed(4);
        }
        weeklyObject.value = weeklyObject.real - smallValue + 1;
        weekly.push(weeklyObject);
      }
      setSelectedValue(weekly[weekly.length - 1].real);
      setGraphData(weekly);
      setGraphPeriod("Past 1 Week");
    } else if (e.target.value === "month") {
      var monthly = [];
      length = subGraphDatasByParams.pairDayDatas.length;
      if (cpa) {
        endValue =
          subGraphDatasByParams.pairDayDatas[0].reserve1 /
          subGraphDatasByParams.pairDayDatas[0].reserve0;
        smallValue =
          subGraphDatasByParams.pairDayDatas[length - 1].reserve1 /
          subGraphDatasByParams.pairDayDatas[length - 1].reserve0;
        changed = endValue - smallValue;
        percent = (Math.abs(changed) / smallValue) * 100;
      } else {
        endValue =
          subGraphDatasByParams.pairDayDatas[0].reserve0 /
          subGraphDatasByParams.pairDayDatas[0].reserve1;
        smallValue =
          subGraphDatasByParams.pairDayDatas[length - 1].reserve0 /
          subGraphDatasByParams.pairDayDatas[length - 1].reserve1;
        changed = endValue - smallValue;
        percent = (Math.abs(changed) / smallValue) * 100;
      }
      if (changed >= 0) {
        setChangeAmount("+" + Math.abs(changed).toFixed(5));
        setChangePercent("+" + percent.toFixed(2));
      } else {
        setChangeAmount("-" + Math.abs(changed).toFixed(5));
        setChangePercent("-" + percent.toFixed(2));
      }
      setFirstToken(subGraphDatasByParams.pairDayDatas[0].token1.symbol);
      setSecondToken(subGraphDatasByParams.pairDayDatas[0].token0.symbol);
      for (var m = 0; m < subGraphDatasByParams.pairDayDatas.length; m++) {
        value =
          subGraphDatasByParams.pairDayDatas[m].reserve0 /
          subGraphDatasByParams.pairDayDatas[m].reserve1;
        if (value < smallValue) {
          smallValue = value;
        }
      }
      for (var n = 0; n < subGraphDatasByParams.pairDayDatas.length; n++) {
        var monthlyObject = {};
        date = new Date(subGraphDatasByParams.pairDayDatas[n].date * 1000);
        monthlyObject.name =
        monthNames[date.getMonth()].name + " " + date.getDate();
        if (cpa) {
          monthlyObject.real = (
            subGraphDatasByParams.pairDayDatas[n].reserve1 /
            subGraphDatasByParams.pairDayDatas[n].reserve0
          ).toFixed(4);
        }else{
          monthlyObject.real = (
            subGraphDatasByParams.pairDayDatas[n].reserve0 /
            subGraphDatasByParams.pairDayDatas[n].reserve1
          ).toFixed(4);
        }
        monthlyObject.value = monthlyObject.real - smallValue + 1;
        monthly[subGraphDatasByParams.pairDayDatas.length - n - 1] =
          monthlyObject;
      }
      setSelectedValue(monthly[monthly.length - 1].real);
      setGraphData(monthly);
      setGraphPeriod("Past 1 Month");
    } else if (e.target.value === "year") {
      console.log("yearly")
      var yearly = [];
      length = subGraphDatas.pairDayDatas.length;
      if (cpa) {
        endValue =
          subGraphDatas.pairDayDatas[0].reserve1 /
          subGraphDatas.pairDayDatas[0].reserve0;
        smallValue =
          subGraphDatas.pairDayDatas[length - 1].reserve1 /
          subGraphDatas.pairDayDatas[length - 1].reserve0;
        changed = endValue - smallValue;
        percent = (Math.abs(changed) / smallValue) * 100;
      } else {
        endValue =
          subGraphDatas.pairDayDatas[0].reserve0 /
          subGraphDatas.pairDayDatas[0].reserve1;
        smallValue =
          subGraphDatas.pairDayDatas[length - 1].reserve0 /
          subGraphDatas.pairDayDatas[length - 1].reserve1;
        changed = endValue - smallValue;
        percent = (Math.abs(changed) / smallValue) * 100;
      }
      if (changed >= 0) {
        setChangeAmount("+" + Math.abs(changed).toFixed(5));
        setChangePercent("+" + percent.toFixed(2));
      } else {
        setChangeAmount("-" + Math.abs(changed).toFixed(5));
        setChangePercent("-" + percent.toFixed(2));
      }
      setFirstToken(subGraphDatas.pairDayDatas[0].token1.symbol);
      setSecondToken(subGraphDatas.pairDayDatas[0].token0.symbol);
      for (var o = 0; o < subGraphDatas.pairDayDatas.length; o++) {
        value =
          subGraphDatas.pairDayDatas[o].reserve0 /
          subGraphDatas.pairDayDatas[o].reserve1;
        if (value < smallValue) {
          smallValue = value;
        }
      }
      for (var p = 0; p < subGraphDatas.pairDayDatas.length; p++) {
        var yearlyObject = {};
        date = new Date(subGraphDatas.pairDayDatas[p].date * 1000);
        yearlyObject.name =
          monthNames[date.getMonth()].name + " " + date.getDate();
        if (cpa) {
          yearlyObject.real = (
            subGraphDatas.pairDayDatas[p].reserve1 /
            subGraphDatas.pairDayDatas[p].reserve0
          ).toFixed(4);
        }else{
          yearlyObject.real = (
            subGraphDatas.pairDayDatas[p].reserve0 /
            subGraphDatas.pairDayDatas[p].reserve1
          ).toFixed(4);
        }
        yearlyObject.value = yearlyObject.real - smallValue + 1;
        yearly.push(yearlyObject);
      }
      setSelectedValue(yearly[yearly.length - 1].real);
      setGraphData(yearly);
      setGraphPeriod("Past 1 Year");
    }
  };
  const changePair = () => {
    if (!changePairOrder) {
      setChangePairOrder(true);
    } else {
      setChangePairOrder(false);
    }
    var e = { target: { value: graphType } };
    graphTypeChange(e, !changePairOrder);
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      setSelectedValue(payload[0].payload.real);
    }
    return null;
  };

  return (
    <Box1>
      <Query
        query={gql`
        {
          pairHourDatas(where: {pair: "${pairId}"}){
            id
            hourStartUnix
            pair{
              id
              token0{
                name
                symbol
              }
              token1{
                name
                symbol
              }
            }
            reserve0
            reserve1
            reserveUSD
          }
          pairDayDatas(where: {pairAddress: "${pairId}"}){
            id
            date
            token0{
              name
              symbol
            }
            token1{
              name
              symbol
            }
            reserve0
            reserve1
            reserveUSD
          }
        }
      `}
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return null;
          setSubGraphDatas(data);
          return null;
        }}
      </Query>
      <Query
        query={gql`
        {
          pairHourDatas(first: 24
            orderBy: hourStartUnix
            where: {pair: "${pairId}"}
            orderDirection: desc){
            id
            hourStartUnix
            pair{
              id
              token0{
                name
                symbol
              }
              token1{
                name
                symbol
              }
            }
            reserve0
            reserve1
            reserveUSD
          }
          pairDayDatas( first: 30
            orderBy: date
            orderDirection: desc
            where: {pairAddress: "${pairId}"}){
            id
            date
            token0{
              name
              symbol
            }
            token1{
              name
              symbol
            }
            reserve0
            reserve1
            reserveUSD
          }
        }
      `}
      >
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return null;
          setSubGraphDatasByParams(data);
          return null;
        }}
      </Query>
      <OuterLink>
        <Link to="#" target="_blank">
          <FaExternalLinkAlt />
        </Link>
      </OuterLink>
      {props.fromToken !== "Select Token" &&
      props.toToken !== "Select Token" ? (
        !changePairOrder ? (
          <Box1TopPart>
            <div className="img-outer">
              <img src={bnbIcon} alt="" />
            </div>
            <div className="img-outer">
              <img src={degenIcon} alt="" />
            </div>
            <Box1Title>{firstToken + "/" + secondToken}</Box1Title>
            <img src={Icon2} onClick={changePair} alt="" />
          </Box1TopPart>
        ) : (
          <Box1TopPart>
            <div className="img-outer">
              <img src={degenIcon} alt="" />
            </div>
            <div className="img-outer">
              <img src={bnbIcon} alt="" />
            </div>
            <Box1Title>{secondToken + "/" + firstToken}</Box1Title>
            <img src={Icon2} onClick={changePair} alt="" />
          </Box1TopPart>
        )
      ) : (
        <p>Please select token pair</p>
      )}

      {props.fromToken !== "Select Token" &&
      props.toToken !== "Select Token" ? (
        <Box1MiddlePart>
          <BMTitle>
            {selectedValue} {changePairOrder ? firstToken : secondToken}{" "}
          </BMTitle>
          <BMRight>
            <GraphTypeSelect value={graphType} onChange={(e)=>graphTypeChange(e, changePairOrder)}>
              <GraphTypeOption value="day">24H</GraphTypeOption>
              <GraphTypeOption value="week">1W</GraphTypeOption>
              <GraphTypeOption value="month">1M</GraphTypeOption>
              <GraphTypeOption value="year">1Y</GraphTypeOption>
            </GraphTypeSelect>
          </BMRight>
        </Box1MiddlePart>
      ) : null}

      {props.fromToken !== "Select Token" &&
      props.toToken !== "Select Token" ? (
        <Box1BottomPart>
          <span>
            {changeAmount} {changePairOrder ? firstToken : secondToken} (
            {changePercent}%)
          </span>{" "}
          {graphPeriod}
        </Box1BottomPart>
      ) : null}
      <div
        className={
          props.fromToken !== "Select Token" && props.toToken !== "Select Token"
            ? "d-block"
            : "d-none"
        }
      >
        {/* <div className="d-block"> */}
        <ResponsiveContainer>
          <AreaChart
            data={graphData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3d4d1b" stopOpacity={1} />
                <stop offset="95%" stopColor="#3d4d1b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <Tooltip
              itemStyle={{ display: "none" }}
              contentStyle={{ display: "none" }}
              content={<CustomTooltip />}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8b9e4f"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Box1>
  );
}

// Styled components
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Box1 = styled.div`
  width: 32.4%;
  position: relative;
  padding: 35px 23px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.bodybg02};
  background-color: ${(props) => props.theme.bodybg03};
  :after {
    content: "";
    position: absolute;
    right: -12px;
    top: 0px;
    width: 1px;
    height: 100%;
    background-color: ${(props) => props.theme.bodybg04};
    border-radius: 10px;
    ${Media.md2} {
      width: 100%;
      height: 1px;
      right: 0px;
      top: auto;
      bottom: -12px;
    }
  }
  &.ver2 {
    background: none;
    border: none;
    padding: 0px;
    :after {
      display: none;
    }
  }
  &.desktop-div {
    ${Media.md2} {
      display: none;
    }
  }
  &.mobile-div {
    display: none;
    ${Media.md2} {
      display: block;
    }
  }
  ${Media.lg} {
    width: 32%;
  }
  ${Media.md2} {
    width: 100%;
    margin-bottom: 20px;
  }
  ${Media.xs} {
    padding: 10px;
  }
`;

const OuterLink = styled.div`
  position: absolute;
  top: 10px;
  right: 7px;
  a {
    color: ${(props) => props.theme.colorLightGrey};
  }
`;

const Box1BottomPart = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colorLightGrey};
  margin-bottom: 30px;
  span {
    color: ${(props) => props.theme.colorGreen2};
  }
`;

const Box1TopPart = styled(FlexDiv)`
  justify-content: flex-start;
  margin-bottom: 10px;
  .img-outer {
    width: 21px;
    height: 21px;
    padding: 2px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${(props) => props.theme.colorWhite};
    margin-right: 1px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &.ver2 {
      width: 27px;
      height: 27px;
    }
  }
  &.mb-0 {
    margin-bottom: 0px;
  }
`;

const Box1Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.colorWhite};
  margin: 0px 10px 0px 15px;
  line-height: normal;
  text-transform: uppercase;
`;

const Box1MiddlePart = styled(FlexDiv)`
  justify-content: space-between;
`;

const BMRight = styled(FlexDiv)`
  justify-content: flex-start;
`;

const GraphTypeSelect = styled.select`
  background: transparent;
  color: white;
  border: 0px;
  padding-right: 10px;
`;

const GraphTypeOption = styled.option`
  background: #16191e;
  border: 0px;
`;

const BMTitle = styled.div`
  font-size: 24px;
  font-family: "Kanit", sans-serif;
  line-height: 36px;
  font-weight: 700;
  color: ${(props) => props.theme.colorWhite};
`;
export default Subgraph;
