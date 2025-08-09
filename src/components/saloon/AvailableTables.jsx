import { useMemo, useState } from 'react';

import { useSitDownChineseMutation } from '@chinese/api/chineseApi';
import AvailableTable from '@components/saloon/AvailableTable';
import { useGetUserQuery } from '@account/api/accountApi';
import { useSitDownMutation } from '@poka/api/pokaApi';
import { useGetTablesQuery } from '@store/gameApi';

const AvailableTables = ({ game }) => {
  const [query, setfQuery] = useState('');
  const { data } = useGetTablesQuery(game, {
    refetchOnMountOrArgChange: true,
  });
  const { data: userData } = useGetUserQuery();

  const useSitDown =
    game === 'poka' ? useSitDownMutation : useSitDownChineseMutation;

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
            <AvailableTable
              key={tableInfo.tableName}
              tableName={tableInfo.tableName}
              joined={tableInfo.joined}
              useSitDown={useSitDown}
              game={game}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableTables;
