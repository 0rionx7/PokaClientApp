import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetTablesQuery } from 'features/gameApi/gameApi';
import AvailableTable from 'pages/saloon/AvailableTable';

const emptyList = [];

const AvailableTables = () => {
  const joinRequests = useSelector(state => state.gameState.joinRequests);
  const [query, setfQuery] = useState('');
  const { availableTables } = useGetTablesQuery(undefined, {
    selectFromResult: ({ data }) => {
      const availableTables = data?.filter(
        tableInfo =>
          !joinRequests?.some(
            ({ tableName }) => tableName === tableInfo.tableName
          )
      );
      const queryTables = availableTables?.filter(tableInfo =>
        tableInfo.tableName.toLowerCase().startsWith(query.trim().toLowerCase())
      );
      return { availableTables: queryTables || emptyList };
    },
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="saloon-tables">
      <div className="form-control">
        <label htmlFor="query">Αναζήτηση τραπεζιού</label>
        <input
          id="query"
          name="query"
          type="text"
          value={query}
          onChange={e => setfQuery(e.target.value)}
        />
      </div>
      {!availableTables.length ? (
        <div className="tables-container">
          <div className="available-tables">
            <div className="available-table" style={{ cursor: 'auto' }}>
              Δεν υπάρχει διαθέσιμο τραπέζι.
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3>Ανοικτά τραπέζια</h3>
          <div className="tables-container">
            <div className="available-tables">
              {availableTables?.map((tableInfo, i) => (
                <AvailableTable tableInfo={tableInfo} key={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableTables;
