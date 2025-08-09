import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useOpenChineseTableMutation } from '@chinese/api/chineseApi';
import AvailableTable from '@components/saloon/AvailableTable';
import { useOpenPokaTableMutation } from '@store/gameApi';
import { useGetUserQuery } from '@account/api/accountApi';

const AvailableTables = ({ useSitDown }) => {
  const [query, setQuery] = useState('');
  const location = useLocation();

  const useGetTables = location.pathname.includes('chinese')
    ? useOpenChineseTableMutation
    : useOpenPokaTableMutation;
  const { data } = useGetTables(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: userData } = useGetUserQuery();

  const joinRequests = userData?.joinRequests;
  const availableTables = useMemo(
    () =>
      data?.filter(
        tableInfo =>
          joinRequests?.every(
            request => request.tableName !== tableInfo.tableName
          ) &&
          tableInfo.tableName
            .toLowerCase()
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
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <h3>Διαθέσιμα τραπέζια</h3>
      <div className="tables-container">
        {!availableTables?.length ? (
          <div className="available-table" style={{ cursor: 'auto' }}>
            Δεν υπάρχει διαθέσιμο τραπέζι.
          </div>
        ) : (
          availableTables?.map((tableInfo, i) => (
            <AvailableTable
              key={tableInfo.tableName}
              tableInfo={tableInfo}
              useSitDown={useSitDown}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableTables;
