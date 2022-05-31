import styles from './Train.module.css';

export const Train = ({
  TrainId,
  TrainNumber,
  DestinationStationCode,
  LineCode,
  CarCount,
  DirectionNum,
  ServiceType,
}) => {
  return (
    <div>
      <div className={styles.train_list_item}>
        <p>Train:{TrainNumber}</p>
        <p>Destination: {DestinationStationCode}</p>
        <p>Direction: {DirectionNum}</p>
        <p>Line: {LineCode}</p>
        <p>Service Type{ServiceType}</p>
      </div>
    </div>
  );
};
