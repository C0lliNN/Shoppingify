import React, { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/UI/Spinner/Spinner';
import getAxios from '../../helpers/axios';
import { Container, TopContainer, Title, ItemGroup } from './styles';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function Statistics() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function getData() {
    try {
      const response = await getAxios().get('/statistics');
      setData(response.data);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.message
        : err.message;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (data) {
    content = (
      <>
        <TopContainer>
          <div>
            <Title>Top Items</Title>
            {data.topItems.map((i) => (
              <ItemGroup key={i._id}>
                <div className="title">
                  <span>{i.name}</span>
                  <span>
                    {Math.round((i.quantity / data.totalItems) * 100)}%
                  </span>
                </div>
                <div className="bar">
                  <div
                    style={{
                      width: `${Math.round(
                        (i.quantity / data.totalItems) * 100
                      )}%`,
                    }}
                    className="indicator orange-bar"
                  ></div>
                  <div className="background"></div>
                </div>
              </ItemGroup>
            ))}
          </div>
          <div>
            <Title>Top Categories</Title>
            {data.topCategories.map((c) => (
              <ItemGroup key={c._id}>
                <div className="title">
                  <span>{c.name}</span>
                  <span>
                    {Math.round((c.quantity / data.totalItems) * 100)}%
                  </span>
                </div>
                <div className="bar">
                  <div
                    style={{
                      width: `${Math.round(
                        (c.quantity / data.totalItems) * 100
                      )}%`,
                    }}
                    className="indicator blue-bar"
                  ></div>
                  <div className="background"></div>
                </div>
              </ItemGroup>
            ))}
          </div>
        </TopContainer>
        <Title style={{ marginTop: '50px' }}>Monthly Summary</Title>
        <ResponsiveContainer width="95%" height={300}>
          <LineChart
            data={data.itemsPerMonth}
            margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Legend />
            <Tooltip />
            <XAxis dataKey="month" />
            <YAxis />
            <Line type="monotone" dataKey="items" stroke="#F9A109" />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  } else if (error) {
    content = <ErrorMessage message={error} />;
  }

  return <Container>{content}</Container>;
}
