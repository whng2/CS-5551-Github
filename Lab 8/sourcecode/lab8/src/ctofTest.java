import static org.junit.Assert.*;

import org.junit.Test;

public class ctofTest {
	CtoFService cf = new CtoFService();
    String value = cf.convertCtoFfromInput(36.8);
    String test = 36.8+"Output in f:"+98.24;

	@Test
	public void test() {
		System.out.println("Test values is:"+test+"which should be equal to actual "+value);
		assertEquals(test, value);
		//fail("Not yet implemented");
	}

}
