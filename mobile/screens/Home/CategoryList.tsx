import React from "react";
import {
  Box,
  FlatList,
  Center,
  NativeBaseProvider,
  Spinner,
  Image,
  Heading,
  Pressable,
} from "native-base";
import useCategories from "../../hooks/category/useCategories";
import { AuthContextValue } from "../../components/contexts/AuthContext";
import { BASE_IMAGE_URL } from "../../helpers/constants";
import { getImageUrl } from "../../helpers/utils";
// import { Pressable, TouchableOpacity } from "react-native";
const CategoryList = () => {
  const { data: categoryData, isLoading, isError, error } = useCategories();
  console.log(categoryData);
  const data = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
  return (
    <>
      {categoryData ? (
        <FlatList
          data={categoryData}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => alert("hello")}
              mb={index === categoryData.length - 1 ? 4 : 0}
            >
              <Box rounded="lg" my={2} bg="white" shadow={2}>
                <Image
                  source={{ uri: getImageUrl(item.image) }}
                  alt={item.name}
                  resizeMode="cover"
                  height={150}
                  roundedTop="md"
                />
                <Center px={2}>
                  <Box py={2}>
                    <Heading size="sm">{item.name}</Heading>
                  </Box>
                </Center>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Center>
          <Spinner size="large" />
        </Center>
      )}
    </>
  );
};

export default CategoryList;
