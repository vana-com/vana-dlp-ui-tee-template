"use client";

import { useConnectWallet, useNetworkStore, useWalletStore } from "@/app/core";
import { Icon } from "@iconify/react";
import {
  AppShell,
  Badge,
  Burger,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const links = [
  { title: "Claim", href: "/claim" },
  { title: "About", href: "/terms" },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const network = useNetworkStore((state) => state.network);

  const [sidebarOpened, { toggle: toggleSidebar }] = useDisclosure();
  const walletAddress = useWalletStore((state) => state.walletAddress);
  const { connect, disconnect } = useConnectWallet();
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  useEffect(() => {
    if (sidebarOpened) {
      toggleSidebar();
    }
  }, [pathname]);

  return (
    <AppShell
      header={{ height: 72 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !sidebarOpened },
      }}
    >
      <AppShell.Header bg="brand-1">
        <Container h="100%">
          <Group h="100%" align="center">
            <Group justify="space-between" w="100%">
              <Group>
                <Burger
                  opened={sidebarOpened}
                  onClick={toggleSidebar}
                  hiddenFrom="sm"
                  size="sm"
                  color="brand-4"
                />

                <Flex pos="relative" dir="row" align="center" gap="sm">
                  <Link href="/">
                    <Title order={5} ff="monospace">
                      DataDAO
                    </Title>
                  </Link>
                  <Badge color="red" variant="light" size="lg">
                    {network as string}
                  </Badge>
                </Flex>

                <Group ml="lg" gap={0} visibleFrom="sm">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <UnstyledButton
                        p={12}
                        c={isActive(link.href) ? "brand-4" : undefined}
                      >
                        <Text size="sm" fw="bold">
                          {link.title}
                        </Text>
                      </UnstyledButton>
                    </Link>
                  ))}
                </Group>
              </Group>

              <Group>
                {walletAddress ? (
                  <Button
                    variant="outline"
                    color="brand-3"
                    onClick={disconnect}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    color="brand-3"
                    // onClick={handleOpenLogin}
                    onClick={connect}
                  >
                    Connect
                  </Button>
                )}
              </Group>
            </Group>
          </Group>
        </Container>

        <Center p={"xs"} bg="var(--mantine-color-red-9)">
          <Text fs={"sm"} c={"white"}>
            THIS IS A TESTNET. POINTS EARNED ON TESTNET HOLD NO VALUE AND ARE
            NOT INDICATIVE OF A FUTURE AIRDROP.
          </Text>
        </Center>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="default"
                fullWidth
                justify="flex-start"
                fw="bold"
                size="lg"
                disabled={isActive(link.href)}
              >
                {link.title}
              </Button>
            </Link>
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main mt={40}>{children}</AppShell.Main>
    </AppShell>
  );
};
