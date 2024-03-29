import { Button, Heading, Text, useToast, VStack } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { memo, useRef, useState } from 'react';
import { FaBarcode } from 'react-icons/fa';

import axios from '../../../utils/http';
import type { Status, User } from '../../../utils/types';
import MFAButton from '../../MFAButton';
import { FailedToast } from '../../Toast';

/**
 * Dynamic import overlays.
 */
const QRDialog = dynamic(() => import('../../Overlay/QRDialog'));

/**
 * Box to refresh TOTP secrets.
 *
 * @param parama - Props.
 * @returns React functional component.
 */
const Authenticatorbox = ({ status, user }: { status: Status; user: User }) => {
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [qrCode, setQRCode] = useState('');
  const leastDestructiveRef = useRef(null);
  const toast = useToast();

  const refreshMFA = () => {
    axios<{ uri: string }>({
      method: 'PATCH',
      url: '/api/v1/auth/update-mfa',
    })
      .then((res) => {
        setIsQRDialogOpen(true);
        setQRCode(res.data.uri);
      })
      .catch((err) => FailedToast(toast, err.message));
  };

  return (
    <>
      <QRDialog
        isOpen={isQRDialogOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={() => setIsQRDialogOpen(false)}
        code={qrCode}
        name={user.fullName}
      />

      <VStack as="section" p={[2, 10]} spacing={5} mt={10}>
        <Heading as="p" size="lg">
          📱 Authenticator Refresh
        </Heading>
        <Text textAlign="center">
          You may refresh your Authenticator account in your phone by clicking
          below button. You have to be verified by MFA before using this
          feature.
        </Text>

        {status.isMFA ? (
          <Button
            colorScheme="green"
            leftIcon={<FaBarcode />}
            onClick={refreshMFA}
          >
            Refresh MFA Authentication
          </Button>
        ) : (
          <MFAButton type="green" user={user} />
        )}
      </VStack>
    </>
  );
};

export default memo(Authenticatorbox);
