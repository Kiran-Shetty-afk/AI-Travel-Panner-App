import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Discover() {
  const domesticDestinations = [
    {
      name: "Goa",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg?w=1400&h=1400&s=1",
      description: "A famous beach destination with vibrant nightlife and beautiful beaches.",
      bestTimeToVisit: "November to March",
      approxCost: "₹25,000 - ₹50,000",
    },
    {
      name: "Agra",
      image: "https://foodandtravel.com/imager/hours/219609/Ministry-of-Tourism-Govt-of-India-595161_Taj-Mahal-Uttar-Pradesh-Aerial_821631bb23140209ea99c8f810f75634.jpg",
      description: "Home to the iconic Taj Mahal, a historical and cultural landmark.",
      bestTimeToVisit: "October to March",
      approxCost: "₹10,000 - ₹20,000",
    },
    {
      name: "Manali",
      image: "https://www.naturetravelagency.com/uploads/1703234831best%20time%20to%20visit%20Manali%20for%20snowfall.jpg",
      description: "A picturesque hill station in the Indian Himalayas, ideal for snow sports and trekking.",
      bestTimeToVisit: "December to February",
      approxCost: "₹15,000 - ₹30,000",
    },
  ];

  const internationalDestinations = [
    {
      name: "Paris, France",
      image: "https://www.pandotrip.com/wp-content/uploads/2013/08/1D110-Bertrand-Monney.jpg",
      description: "The city of love, known for its iconic landmarks like the Eiffel Tower and museums.",
      bestTimeToVisit: "April to June, September to November",
      approxCost: "$1,500 - $3,000",
    },
    {
      name: "Bali, Indonesia",
      image: "https://www.himalayanspace.com/wp-content/uploads/2023/04/bali-.jpg",
      description: "A tropical paradise with beautiful beaches, temples, and rich culture.",
      bestTimeToVisit: "April to October",
      approxCost: "$1,000 - $2,500",
    },
    {
      name: "Tokyo, Japan",
      image: "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW98ZW58MHx8MHx8fDA%3D",
      description: "A bustling metropolis offering both modern technology and ancient traditions.",
      bestTimeToVisit: "March to May, September to November",
      approxCost: "$2,000 - $4,000",
    },
    {
      name: "Rome, Italy",
      image: "https://inlifehousing.com/wp-content/uploads/2023/06/Roma.jpg",
      description: "A historic city filled with ancient monuments, art, and culture, including the Colosseum.",
      bestTimeToVisit: "April to June, September to October",
      approxCost: "$1,500 - $3,500",
    },
    {
      name: "Dubai, UAE",
      image: "https://media1.thrillophilia.com/filestore/m55flwylcmf0vd03bbzdumqa4bpb_1540378961_Dubai__.jpeg?w=400&dpr=2",
      description: "A modern, luxurious city known for its skyscrapers, shopping malls, and deserts.",
      bestTimeToVisit: "November to March",
      approxCost: "$1,500 - $3,000",
    },
    {
      name: "Sydney, Australia",
      image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lkbmV5JTIwY2l0eXxlbnwwfHwwfHx8MA%3D%3D",
      description: "Famous for its stunning Opera House and Harbour Bridge, with beautiful beaches and parks.",
      bestTimeToVisit: "September to November, March to May",
      approxCost: "$2,000 - $4,500",
    },
    {
      name: "Cape Town, South Africa",
      image: "https://www.andbeyond.com/wp-content/uploads/sites/5/cape-town-aerial-view-greenpoint-stadium.jpg",
      description: "Known for its beautiful beaches, wildlife safaris, and the iconic Table Mountain.",
      bestTimeToVisit: "November to March",
      approxCost: "$1,500 - $3,000",
    },
  ];

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.heading}>Discover Amazing Destinations</Text>
      <Text style={styles.subheading}>Domestic Trips</Text>
      {domesticDestinations.map((destination, index) => (
        <View key={index} style={styles.destinationContainer}>
          <Image source={{ uri: destination.image }} style={styles.image} />
          <Text style={styles.destinationName}>{destination.name}</Text>
          <Text style={styles.description}>{destination.description}</Text>
          <Text style={styles.details}>Best Time to Visit: {destination.bestTimeToVisit}</Text>
          <Text style={styles.details}>Approx. Cost: {destination.approxCost}</Text>
        </View>
      ))}

      <Text style={styles.subheading}>International Trips</Text>
      {internationalDestinations.map((destination, index) => (
        <View key={index} style={styles.destinationContainer}>
          <Image source={{ uri: destination.image }} style={styles.image} />
          <Text style={styles.destinationName}>{destination.name}</Text>
          <Text style={styles.description}>{destination.description}</Text>
          <Text style={styles.details}>Best Time to Visit: {destination.bestTimeToVisit}</Text>
          <Text style={styles.details}>Approx. Cost: {destination.approxCost}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  destinationContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  destinationName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  details: {
    fontSize: 14,
    color: "#888",
  },
});
