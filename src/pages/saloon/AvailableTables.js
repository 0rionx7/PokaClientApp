import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetTablesQuery } from 'features/gameState/gameStateApi';
import AvailableTable from 'pages/saloon/AvailableTable';
import Button from 'components/ui/Button';

const AvailableTables = () => {
  const joinRequests = useSelector(state => state.account.joinRequests);
  const [query, setfQuery] = useState('');
  const { data, refetch } = useGetTablesQuery();

  const availableTables = useMemo(
    () =>
      data?.filter(
        tableInfo =>
          tableInfo.tableName
            .toLowerCase()
            .startsWith(query.trim().toLowerCase()) &&
          !joinRequests?.some(
            ({ tableName }) => tableName === tableInfo.tableName
          )
      ),
    [data, joinRequests, query]
  );

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
          {!availableTables?.length ? (
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
