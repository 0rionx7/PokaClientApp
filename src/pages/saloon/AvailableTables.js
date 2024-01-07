import { useMemo, useState } from 'react';

import { useGetTablesQuery } from 'features/gameState/gameStateApi';
import AvailableTable from 'pages/saloon/AvailableTable';

const AvailableTables = () => {
  const [query, setfQuery] = useState('');
  const { data } = useGetTablesQuery();

  const availableTables = useMemo(
    () =>
      data?.filter(tableInfo =>
        tableInfo.tableName.toLowerCase().startsWith(query.trim().toLowerCase())
      ),
    [data, query]
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
      <h3>Διαθέσιμα τραπέζια</h3>
      {/* <Button className="green" prompt="ανανέωση λίστας" onClick={refetch} /> */}
      <div className="tables-container">
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
  );
};

export default AvailableTables;
