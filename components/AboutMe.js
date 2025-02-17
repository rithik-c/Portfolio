import {
  SimpleGrid,
  Text,
  Stack,
  Heading,
  Image,
  Flex,
  Box,
  chakra,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react'

import useMediaQuery from '../hook/useMediaQuery'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import ReactGA from 'react-ga4'

export default function AboutMe() {
  const isLargerThan800 = useMediaQuery(800)
  const handleHover = (event) => {
    ReactGA.event({
      category: 'hover',
      action: event,
    })
  }
  const MoreInfo = ({ text, content }) => {
    return (
      <>
        {' '}
        {isLargerThan800 ? (
          <Popover isLazy placement="right" trigger="hover">
            <PopoverTrigger>
              <chakra.span
                color="button1"
                cursor="help"
                onMouseOver={() => handleHover(`about_${text}`)}
              >
                {text}
              </chakra.span>
            </PopoverTrigger>
            <PopoverContent color="white" bg="secondary" borderColor="button1">
              <PopoverArrow bg="button1" />
              <PopoverBody color="textPrimary" fontSize="sm">
                {content}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Text as="span" color="button1">
            {text}
          </Text>
        )}{' '}
      </>
    )
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <SlideUpWhenVisible>
          <Stack spacing={4}>
            <Heading fontFamily="Ubuntu" fontSize="2xl">
              ⚡ About Me
            </Heading>
            <Text
              color="textSecondary"
              fontSize={{ base: '14px', md: '16px' }}
              whiteSpace="pre-line"
            >
              Hey! I'm Rithik, I've spent the last decade turning ideas into 
              software that makes an impact. From tinkering with my first 
              scripts to leading full-scale projects, programming has shaped 
              how I think and create.
              <br/><br/>
              I previously worked at{' '}
              <MoreInfo
                content="SOTI - remote mobile and IoT device management solutions"
                text="enterprise mobility management"
              />
              and{' '}
              <MoreInfo
                content="NCR - known for its digital banking and point-of-service retail software"
                text="ecommerce software"
              />
              companies. Currently, I'm a Full-Stack Software Engineer at a recruitment and 
              consulting agency based in Michigan, USA. I've also done{' '}
              <MoreInfo
                content={
                  <>
                    Designed and developed the{' '}
                    <a href="https://crowningconsulting.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'button1'}}>
                      crowningconsulting.com
                    </a>{' '}
                    website, among other contract projects
                  </>
                }
                text="freelance work"
              />
              and written multiple research papers on Three.js and other 3D web frameworks. 
              <br/><br/>
              Beyond work, I co-founded{' '}
              <MoreInfo
                content={
                  <>
                    Check out our inaugural year's{' '}
                    <a href="https://gryphhacks-2022.devpost.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'button1'}}>
                      Devpost
                    </a>{' '}
                    page!
                  </>
                }
                text="GryphHacks"
              />
              , an international hackathon, 
              raising $25K in funding and hosting 700 students from 30 countries for three 
              consecutive years. I've also attended (and won) several hackathons—some of those{' '}
              <MoreInfo
                content={
                  <>
                    You can also check them out in detail on my {' '}
                    <a href="https://devpost.com/rithik-c" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'button1'}}>
                      Devpost
                    </a>{' '}
                    here!
                  </>
                }
                text="projects"
              />
              are featured below. 
              {/* <br/><br/>
              Right now, I'm focused on full-stack software systems, expanding my cloud expertise, 
              and deepening my knowledge of AI-driven programming. */}
            </Text>
          </Stack>
        </SlideUpWhenVisible>
        <SlideUpWhenVisible>
          <Flex align="center" justify="center">
            <Box
              pos="relative"
              maxW={{ base: '300px', lg: '350px' }}
              maxH={{ base: '300px', lg: '350px' }}
            >
              <Image
                pos="absolute"
                zIndex={3}
                top="0px"
                right={{ base: '-32px', lg: '-64px' }}
                w={{ base: '100px', lg: '150px' }}
                alt=""
                filter="invert(0.1)"
                src="https://svgsilh.com/svg/26432.svg"
              />
              <Image
                w={{ base: '300px', lg: '350px' }}
                h={{ base: '300px', lg: '350px' }}
                borderRadius="50%"
                alt="Rithik C"
                src="pfp.jpg"
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Flex>
        </SlideUpWhenVisible>
      </SimpleGrid>
    </>
  )
}
