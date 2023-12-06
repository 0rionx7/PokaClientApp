import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetTablesQuery } from 'features/gameStateSlice/gameApi';
import AvailableTable from 'pages/saloon/AvailableTable';
import Button from 'components/ui/Button';

const emptyList = [];

const AvailableTables = () => {
  const joinRequests = useSelector(state => state.auth.joinRequests);
  const [query, setfQuery] = useState('');
  const { availableTables, refetch } = useGetTablesQuery(undefined, {
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
      <h3>Ανοικτά τραπέζια</h3>
      <Button className="green" prompt="ανανέωση λίστας" onClick={refetch} />
      <div className="tables-container">
        <div className="available-tables">
          {!availableTables.length ? (
            <div className="available-table" style={{ cursor: 'auto' }}>
              Δεν υπάρχει διαθέσιμο τραπέζι.
            </div>
          ) : (
            availableTables?.map((tableInfo, i) => (
              <AvailableTable tableInfo={tableInfo} key={i} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableTables;
