import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import classnames from 'classnames';
import styles from './TrainsContainer.module.css';

export const TrainsContainer = () => {
  const [trainData, setTrainData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { direction, lineColor, serviceType } = useAppContext();

  const getTrainData = async () => {
    const url =
      'https://api.wmata.com/TrainPositions/TrainPositions?contentType=json&DirectionNum=1';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        api_key: '3176fb08fa6d423ba329ea9c17acf9a2',
      },
    });
    let data = await response.json();
    setTrainData(data.TrainPositions);
    setFilteredData(data.TrainPositions);
  };

  const filterServiceType = (data) => {
    if (serviceType !== '') {
      const filtered = data.filter((train) => {
        return train.ServiceType === serviceType;
      });
      return filtered;
    } else {
      return data;
    }
  };

  const filterLineColor = (data) => {
    if (lineColor !== '') {
      const filtered = data.filter((train) => {
        return train.LineCode === lineColor;
      });
      return filtered;
    } else {
      return data;
    }
  };

  const filterDirection = (data) => {
    if (direction !== '') {
      const filtered = data.filter((train) => {
        return train.DirectionNum == direction;
      });
      return filtered;
    } else {
      return data;
    }
  };

  useEffect(() => {
    getTrainData();
  }, []);

  useEffect(() => {
    let result = trainData;
    result = filterLineColor(result);
    result = filterServiceType(result);
    result = filterDirection(result);
    setFilteredData(result);
  }, [serviceType, lineColor, direction]);

  return (
    <div className={styles.train_container}>
      <table className={styles.train_table}>
        <tr className={styles.train_list_header}>
          <th>Train</th>
          <th>Destination</th>
          <th>Direction</th>
          <th>Car Count</th>
          <th>Service Type</th>
        </tr>
        {Object.keys(filteredData).map((train) => {
          return (
            <tr
              key={filteredData[train].TrainId}
              className={styles.train_list_item}
            >
              <td>
                <div
                  className={classnames(
                    styles.line_color,
                    filteredData[train].LineCode === 'RD'
                      ? styles.red_line
                      : filteredData[train].LineCode === 'GR'
                      ? styles.green_line
                      : filteredData[train].LineCode === 'BL'
                      ? styles.blue_line
                      : filteredData[train].LineCode === 'SV'
                      ? styles.silver_line
                      : filteredData[train].LineCode === 'YL'
                      ? styles.yellow_line
                      : filteredData[train].LineCode === 'OR'
                      ? styles.orange_line
                      : filteredData[train].LineCode === 'BL'
                      ? styles.blue_line
                      : styles.no_color
                  )}
                >
                  {filteredData[train].TrainNumber}
                </div>
              </td>
              <td>{filteredData[train].DestinationStationCode}</td>
              {filteredData[train].DirectionNum == '1' ? (
                <td>NorthBound</td>
              ) : (
                <td>Southbound</td>
              )}
              <td>{filteredData[train].CarCount}</td>
              <td
                className={classnames(
                  filteredData[train].ServiceType === 'Unknown'
                    ? styles.unknown
                    : filteredData[train].ServiceType === 'Normal'
                    ? styles.normal
                    : styles.nonpassenger
                )}
              >
                {filteredData[train].ServiceType}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
