import { useState } from "react";
import { Box, Button, Container, Flex, IconButton, Input, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const toast = useToast();

  const handleAddNote = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Error",
        description: "Note cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes([...notes, { id: Date.now(), text: inputValue }]);
    setInputValue("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (note) => {
    setEditId(note.id);
    setEditText(note.text);
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) {
      toast({
        title: "Error",
        description: "Note cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes(notes.map((note) => (note.id === editId ? { ...note, text: editText } : note)));
    setEditId(null);
    setEditText("");
  };

  return (
    <Container maxW="container.md" p={5}>
      <VStack spacing={4}>
        <Flex w="full">
          <Input placeholder="Add a new note..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddNote()} />
          <IconButton colorScheme="blue" aria-label="Add note" icon={<FaPlus />} onClick={handleAddNote} ml={2} />
        </Flex>

        {notes.map((note) => (
          <Flex key={note.id} w="full" alignItems="center">
            {editId === note.id ? <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} placeholder="Edit your note..." /> : <Text flex="1">{note.text}</Text>}
            <IconButton ml={2} colorScheme="red" aria-label="Delete note" icon={<FaTrash />} onClick={() => handleDeleteNote(note.id)} />
            {editId === note.id ? <IconButton ml={2} colorScheme="green" aria-label="Save edit" icon={<FaSave />} onClick={handleSaveEdit} /> : <IconButton ml={2} colorScheme="teal" aria-label="Edit note" icon={<FaEdit />} onClick={() => handleEditNote(note)} />}
          </Flex>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
