import { useMemo, useState } from 'react';

import { useGetChineseTablesQuery } from 'chinese/api/chineseApi';
import { useGetUserQuery } from 'account/api/accountApi';
import AvailableTable from './AvailableTable';

const AvailableTables = () => {
  const [query, setfChineseQuery] = useState('');
  const { data } = useGetChineseTablesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: userData } = useGetUserQuery();

  const joinRequests = userData?.joinRequestsChinese;
  const availableTables = useMemo(
    () =>
      data?.filter(
        tableInfo =>
          joinRequests?.every(
            request => request.tableName !== tableInfo.tableName
          ) &&
          tableInfo.tableName
            ?.toLowerCase()
            .startsWith(query.trim().toLowerCase())
      ),
    [data, query, joinRequests]
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
          onChange={e => setfChineseQuery(e.target.value)}
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
