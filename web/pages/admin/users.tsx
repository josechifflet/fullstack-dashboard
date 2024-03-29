import { Button, Grid, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { memo, useState } from 'react';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';

import UserCard from '../../components/Card/UserCard';
import Layout from '../../components/Layout';
import CreateUserModal from '../../components/Overlay/CreateUserModal';
import NotMFA from '../../components/Pages/Admin/NotMFA';
import Spinner from '../../components/Spinner';
import { useUsers } from '../../utils/hooks';
import routes from '../../utils/routes';

/**
 * Users page for administrators.
 *
 * @returns React functional component.
 */
const Users = () => {
  const { users, isLoading, isError } = useUsers();
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  if (isLoading) return <Spinner />;

  return (
    <>
      <CreateUserModal
        isOpen={isOpenCreate}
        onClose={() => setIsOpenCreate(false)}
      />

      <Layout title={['Users']}>
        {isError && <NotMFA error={isError} />}

        {!isError && (
          <VStack align="start" as="section">
            <HStack w="full">
              <Text as="p" fontWeight="bold" fontSize="2xl">
                Users
              </Text>

              <Spacer />

              <HStack>
                <NextLink href={routes.admin} passHref>
                  <Button
                    as="a"
                    size="sm"
                    leftIcon={<FaArrowLeft />}
                    colorScheme="green"
                  >
                    Back
                  </Button>
                </NextLink>

                <Button
                  size="sm"
                  leftIcon={<FaCheck />}
                  colorScheme="orange"
                  onClick={() => setIsOpenCreate(true)}
                >
                  Create User
                </Button>
              </HStack>
            </HStack>

            <Grid
              templateColumns={[
                '1fr',
                'repeat(2, 1fr)',
                'repeat(4, 1fr)',
                'repeat(5, 1fr)',
                'repeat(6, 1fr)',
              ]}
              gap={4}
              pt={2}
              w="full"
            >
              {users &&
                users.map((user) => <UserCard key={user.ID} user={user} />)}
            </Grid>
          </VStack>
        )}
      </Layout>
    </>
  );
};

export default memo(Users);
