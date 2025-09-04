import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useSitDownChineseMutation } from '@chinese/api/chineseApi';
import AvailableTable from '@components/availableTables/AvailableTable';
import { useGetUserQuery } from '@account/api/accountApi';
import { useSitDownMutation } from '@poka/api/pokaApi';
import { useGetTablesQuery } from '@store/gameApi';

const AvailableTables = () => {
  const [query, setfQuery] = useState('');
  const { state } = useLocation();

  const { data } = useGetTablesQuery(state.game, {
    refetchOnMountOrArgChange: true,
  });
  const { data: userData } = useGetUserQuery();

  const useSitDown =
    state.game === 'poka' ? useSitDownMutation : useSitDownChineseMutation;

  const joinRequests = userData?.joinRequests;
  const availableTables = useMemo(
    () =>
      data?.filter(
        (tableInfo) =>
          joinRequests?.every(
            (request) => request.tableName !== tableInfo.tableName,
          ) &&
          tableInfo.tableName
            .toLowerCase()
            .startsWith(query.trim().toLowerCase()),
      ),
    [data, query, joinRequests],
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
          onChange={(e) => setfQuery(e.target.value)}
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
          availableTables?.map((tableInfo) => {
            return (
              <AvailableTable
                key={tableInfo.tableName}
                tableInfo={tableInfo}
                useSitDown={useSitDown}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default AvailableTables;
