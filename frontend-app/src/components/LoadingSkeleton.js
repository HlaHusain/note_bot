import { Skeleton, Stack,Box } from "@mui/material"

export const LoadingSkeleton = () => {

    return (
        <Box>
        <Stack>
        <Skeleton varient="text"/>
        <Stack>
        <Skeleton varient="caption"/>
        <Skeleton varient="caption"/>
        <Skeleton varient="caption"/>
     
        </Stack>
        <Box>
        <Skeleton varient="caption"/>
        <Skeleton varient="caption"/>
        <Skeleton varient="caption"/>
     
        </Box>
   </Stack>

        
        </Box>
    );
}