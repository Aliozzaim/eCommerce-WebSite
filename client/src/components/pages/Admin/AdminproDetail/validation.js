import { number, object, string,} from 'yup';

const validations = object({
    title: string().required(),
	description: string().min(5).required(),
	price: number().required(),

    
  });

export default validations










