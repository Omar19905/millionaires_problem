import Head from 'next/head'
import {Inter} from '@next/font/google'
import styles from '../styles/Home.module.css'
import {
    ConnectWallet,
    useAddress,
    useContract, useContractMetadata,
    useContractRead,
    Web3Button,
} from "@thirdweb-dev/react";
import {Box, Button, Flex, HStack, Input, Spacer, Text, VStack, Image} from "@chakra-ui/react";
import {useToast} from '@chakra-ui/react'
import {useEffect, useState} from "react";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const [name, setName] = useState("")
    const [value, setValue] = useState(0)
    const [wealthiest, setWealthiest] = useState(null)
    const [numParticipants, setNum] = useState("loading")
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const address = useAddress();
    const contractAddress = "0xC3d604276CC716a1f85587241424B5804735F6dB";
    const {contract} = useContract(contractAddress);

    // const {data: numParticipants, isLoading} = useContractRead(contract, "numParticipants")

    async function updateParticipants() {
        console.log("contract")
        console.log(contract)
        if (contract){
            let data = await contract.call("numParticipants")
            setNum(data.toNumber())
        }

    }




    useEffect(() => {
        updateParticipants()
    }, [contract])
    return (
        <>
            <Head>
                <title>Millionaires Problem</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <main className={styles.main}>


                <div className={styles.description}>


                    <VStack align="left">
                        <Flex mx={-14} w={"100%"}> <Image mx={2} w={8} h={8}
                                                          src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"}/>
                            {address}</Flex>
                        <Box minWidth={"160px"}><code className={styles.code}>Millionaires Problem</code></Box>
                        <Box minWidth={"160px"}><code
                            className={styles.code}>Participants: {numParticipants}</code></Box>
                        <Box minWidth={"160px"}></Box>

                    </VStack>
                    <Flex justify="center" w={"80%"}>

                        {address ? (
                            <HStack alignSelf={"center"}>
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                    h={"40px"} w={"230px"} placeholder={"Name"}
                                    fontWeight={"semibold"}
                                >

                                </Input>
                                <Input
                                    onChange={(e) => setValue(e.target.value)}
                                    h={"40px"} w={"230px"} placeholder={"Wealth"} fontWeight={"semibold"}
                                ></Input>
                                <Spacer/>


                                {/*<Web3Button*/}
                                {/*    contractAddress={contractAddress}*/}
                                {/*    action={(contract) => {*/}
                                {/*        contract.call("addValue", name, value)*/}
                                {/*    }}*/}
                                {/*    onSuccess={(result) => console.log(result)}*/}

                                {/*>*/}
                                {/*    Submit*/}
                                {/*</Web3Button>*/}
                                <Button isLoading={loading} onClick={async () => {
                                    setLoading(true)
                                    let data = await contract.call("addValue", name, value)
                                        .then(() => {
                                            toast({
                                                title: 'Success !',
                                                description: "value sent successfully",
                                                status: 'success',
                                                duration: 5000,
                                                position: 'top-right',
                                                isClosable: true,
                                            })
                                            setLoading(false)
                                            updateParticipants()
                                        })
                                }
                                } bg={"black"} color={"white"}>Submit</Button>

                            </HStack>

                        ) : (
                            <>
                                <Spacer/>
                                <ConnectWallet className={"connect"}/>
                            </>
                        )}

                    </Flex>

                </div>

                <Flex w={"950px"} fontFamily={"font-mono"} fontSize={"3.0rem"}>
                    <Box minWidth={"160px"}>
                        <code className={styles.code}>The wealthiest is: {wealthiest}
                        </code></Box>

                </Flex>

                {address && <Flex w={"700px"} justifyContent={"space-around"}>
                    <Button onClick={async () => {
                        let data = await contract.call("getWealthiestName")
                        setWealthiest(data)
                    }
                    } bg={"black"} color={"white"}>Determine the wealthiest</Button>


                    <Button bg={"transparent"} isLoading={loading} onClick={async () => {
                        setLoading(true)
                        let data = await contract.call("reset")
                        setWealthiest(null)
                        setNum(0)
                        setLoading(false)
                    }
                    } >reset</Button>
                </Flex>}

            </main>
        </>
    )
}
