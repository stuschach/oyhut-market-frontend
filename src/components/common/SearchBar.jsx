import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { searchProducts } from '../../store/slices/productsSlice';
import { debounce } from '../../utils/helpers';

const SearchBar = ({ fullWidth = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults, searchLoading } = useSelector((state) => state.products);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term.trim().length >= 2) {
        dispatch(searchProducts(term));
      }
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setOpen(false);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product._id}`);
    setSearchTerm('');
    setOpen(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    setOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{ width: fullWidth ? '100%' : 300 }}
    >
      <Autocomplete
        freeSolo
        open={open && searchTerm.length >= 2}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={searchResults}
        loading={searchLoading}
        getOptionLabel={(option) => 
          typeof option === 'string' ? option : option.name
        }
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            onClick={() => handleProductClick(option)}
            sx={{ cursor: 'pointer' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {option.images?.[0] && (
                <Box
                  component="img"
                  src={option.images[0].url}
                  alt={option.name}
                  sx={{
                    width: 40,
                    height: 40,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              )}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {option.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ${option.price.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            variant="outlined"
            size="small"
            fullWidth={fullWidth}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {searchLoading && <CircularProgress size={20} />}
                  {searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={handleClear}
                        edge="end"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )}
                </>
              ),
              sx: {
                backgroundColor: 'background.paper',
                borderRadius: 2,
              },
            }}
          />
        )}
        PaperComponent={(props) => (
          <Paper {...props} elevation={3} sx={{ mt: 1 }} />
        )}
        noOptionsText={
          searchTerm.length < 2
            ? 'Type at least 2 characters to search'
            : 'No products found'
        }
      />
    </Box>
  );
};

export default SearchBar;